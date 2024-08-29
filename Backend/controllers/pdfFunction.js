const upload = require('../middleware/uploadMiddleware');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { HuggingFaceInferenceEmbeddings } = require('@langchain/community/embeddings/hf');

const { Cohere } = require("@langchain/cohere");
const { Pinecone } = require('@pinecone-database/pinecone');
const { PineconeStore } = require('@langchain/pinecone');

const fs = require("fs");
const uuid = require('uuid');

const axios = require('axios');

require('dotenv').config();  

//GLOBAL SCOPE PINECONE
const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    });

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

//GLOBAL SCOPE FOR EMBEDDING
const embeddings = new HuggingFaceInferenceEmbeddings({ apiKey: process.env.HUGGINGFACEHUB_API_KEY});

const model = new Cohere({
  maxTokens: 100,
  apiKey: process.env.COHERE_API_KEY
});



const pdfProcessingFunction = async (req, res) => {

  try {

    const pdfFilePath = await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
          if (err) {
              console.log("Error during file upload:", err);
              return reject("File upload failed.");
          }
  
          if (!req.file) {
              console.log("No file selected. req.file is", req.file);
              return reject('Error: No File Selected!');
          }
  
          console.log("pdf req file path is", req.file.path);
          resolve(req.file.path);
      });
  });
  
  if (!pdfFilePath) {
      return res.status(400).send('File upload failed.');
  }
    console.log("actual pdf file path", pdfFilePath)
    // //Load pdf using file path
    const loader = new PDFLoader(pdfFilePath);
    const docs = await loader.load();

    console.log("Loaded PDF document", docs, typeof docs);
    

    // //Chunck pdf
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log('splited document is', { splitDocs });

    const pdfUniqueId = uuid.v4();

    const modifiedPdfDoc = await splitDocs.map((piece) => {
      return {
        ...piece,
        metadata: {
          ...piece.metadata,
          source: pdfUniqueId,
        },
      };
  });
   


  console.log('modified pdf document', modifiedPdfDoc, 'and source string id')
// Print the source key in the console
modifiedPdfDoc.forEach((piece) => {
  console.log("id of the modified doc for each", piece.metadata.source);
});
   

    await PineconeStore.fromDocuments(modifiedPdfDoc, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    })
    console.log("Vector Store Successful");

    await fs.promises.unlink(pdfFilePath);
    console.log("Pdf has been delete successfully");
 
    return res.status(200).json({ message: "PDF processed and vector embedding successful",
      documentUniqueId: pdfUniqueId
     });

    } catch (error) {
      console.error("Error processing PDF:", error);
      return res.status(500).json({ error: "Internal Server Error!"})
    }





}


// This function is for conversing with the pdf
const pdfSearchFunction = async (req, res) => {
  

  const userMessage = req.body.userMessage;
  const pdfUniqueId = req.body.pdfUniqueId;
  console.log("U p", userMessage, pdfUniqueId)
  try {
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddings,
      { pineconeIndex },
    );

    /* Search the vector DB independently with metadata filters */
    const results = await vectorStore.similaritySearch(userMessage, 1,  { source: pdfUniqueId} );

    console.log("This is the returned relevant chunks", results);

    const retrievedDocuments = results.map((doc) => doc.pageContent).join("\n");
    console.log('joined content', retrievedDocuments)
    // PROMT LLM
    // const llm = await model.invoke(`Based on this retrieved content ${retrievedDocuments} from a pdf user uploaded, help answer this user's question ${userMessage}, please don't go out of it, if you don't know, just say i don't know or say the answer you're looking for isn't available in your uploaded pdf.`);

    const llm = await model.invoke(`Based on this retrieved content ${retrievedDocuments} from a pdf user uploaded, help answer this user's question ${userMessage}, please don't go out of the particular topic that is been uploaded and if it is not related just write I do not have the answer for that because it was not provided in the PDF! and also if the last word of the sentence does not add up to the rest do not display it.`);

    console.log("llm response:", llm)
    return res.status(200).json({ message: llm, from: 'ai' })
  } catch (error) {

    return res.status(500).json({error: "Internal server Error"})
    
  }
}



const deletePdfFromVectorStoreFunction = (req, res) => {

  const pdfId = req.body;

  try {
    const deletedPdf = pineconeStore.delete({ source: pdfId });

    if (!deletedPdf) {
      return console.log("pdf didnt delete", deletedPdf)
    }
    return console.log("pdf didnt delete", deletedPdf);

  } catch (error) {

  }

};


module.exports = { pdfProcessingFunction,
                   pdfSearchFunction,
                   deletePdfFromVectorStoreFunction
                   }

