# Readmee AI 📚🤖

An intelligent PDF interaction application that allows users to upload PDF documents and have AI-powered conversations with their content. Perfect for students, researchers, and professionals who want to quickly extract information from their documents without reading through everything.


## 🌟 Features

- **PDF Upload & Processing**: Upload PDF documents (up to 1MB) for instant processing
- **AI-Powered Chat**: Ask questions about your uploaded PDF and get intelligent responses
- **Vector Database Storage**: Uses Pinecone for efficient document storage and retrieval
- **Smart Chunking**: Documents are intelligently split for optimal AI processing
- **Real-time Responses**: Get instant answers based solely on your document content
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Mobile Responsive**: Works seamlessly across all device sizes


## 🏗️ Architecture

### Frontend (React + Vite)
- **React 18** with modern hooks and functional components
- **Tailwind CSS** for styling and responsive design
- **React Router** for navigation
- **Axios** for API communication
- **React Toastify** for user notifications

### Backend (Node.js + Express)
- **Express.js** server with RESTful API
- **LangChain** for document processing and AI integration
- **Pinecone** vector database for document storage
- **Cohere AI** for language model responses
- **HuggingFace** embeddings for vector generation
- **Multer** for file upload handling

### AI Technologies
- **LangChain Community**: Document loaders and text splitting
- **Pinecone Vector Database**: Efficient similarity search
- **Cohere LLM**: Natural language processing and responses
- **HuggingFace Embeddings**: Document vectorization

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Pinecone account and API key
- Cohere API key
- HuggingFace API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PonmileDaniel/readmeee.git
   cd readmeee/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the Backend directory:
   ```env
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index_name
   COHERE_API_KEY=your_cohere_api_key
   HUGGINGFACEHUB_API_KEY=your_huggingface_api_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_REACT_APP_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173`

## 🔧 API Endpoints

### POST `/pdf/process-pdf`
Upload and process a PDF document
- **Body**: FormData with 'pdf' file
- **Response**: Document unique ID for future queries

### POST `/pdf/search-pdf`
Search and chat with uploaded PDF
- **Body**: 
  ```json
  {
    "userMessage": "Your question here",
    "pdfUniqueId": "document-unique-id"
  }
  ```
- **Response**: AI-generated answer based on document content

### POST `/pdf/delete-pdf`
Delete a PDF from the vector store
- **Body**: 
  ```json
  {
    "pdfId": "document-unique-id"
  }
  ```

## 📁 Project Structure

```
readmeee/
├── Backend/
│   ├── controllers/
│   │   └── pdfFunction.js          # PDF processing logic
│   ├── middleware/
│   │   └── uploadMiddleware.js     # File upload configuration
│   ├── routes/
│   │   └── pdfHandleRoute.js       # API routes
│   ├── index.js                    # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── Hero.jsx            # Landing page hero
│   │   │   ├── About.jsx           # About section
│   │   │   └── analysis.jsx        # Features showcase
│   │   ├── Pages/
│   │   │   ├── UploadDocumentPage.jsx  # PDF upload interface
│   │   │   ├── Chat.jsx            # Chat interface
│   │   │   └── protect.jsx         # Route protection
│   │   ├── stylingFolder/          # CSS files
│   │   ├── assets/                 # Images and media
│   │   └── App.jsx                 # Main application component
│   ├── public/
│   └── package.json
└── README.md
```

## 🎯 Usage

1. **Upload a PDF**: Navigate to the upload page and select a PDF file (max 1MB)
2. **Wait for Processing**: The system will chunk and vectorize your document
3. **Start Chatting**: Ask questions about your document content
4. **Get Intelligent Responses**: Receive answers based solely on your uploaded content

## 🛡️ Features in Detail

### Document Processing Pipeline
1. **File Upload**: Secure PDF upload with validation
2. **Text Extraction**: Content extraction using LangChain PDF loader
3. **Document Chunking**: Intelligent text splitting for optimal processing
4. **Vector Generation**: Creating embeddings using HuggingFace
5. **Storage**: Storing vectors in Pinecone database with unique identifiers

### AI Chat System
- **Context-Aware**: Responses are generated only from uploaded document content
- **Similarity Search**: Finds most relevant document chunks for each query
- **Accurate Responses**: LLM generates answers based on retrieved context
- **Fallback Handling**: Clear messages when information isn't available in the document

## 🔮 Future Enhancements

- [ ] Support for multiple file formats (DOCX, TXT, etc.)
- [ ] Document summarization feature
- [ ] Multiple document chat capability
- [ ] User authentication and document management
- [ ] Advanced search and filtering options
- [ ] Document annotation and highlighting
- [ ] Collaborative document sharing
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ndukwe Daniel (PonmileDaniel)**
- Twitter: [@PonmileDaniel](https://x.com/PonmileDaniel)
- GitHub: [@PonmileDaniel](https://github.com/PonmileDaniel)
- LinkedIn: [Connect with me](https://linkedin.com/in/ponmiledaniel) *(Update with actual LinkedIn)*

## 🙏 Acknowledgments

- **ALX Software Engineering Program** - Foundation project inspiration
- **LangChain** - For excellent document processing tools
- **Pinecone** - For powerful vector database capabilities
- **Cohere** - For advanced language model integration
- **React & Vite** - For modern frontend development tools

## 💡 Inspiration

> "The inspiration behind Readmee was my laziness! As a student in a Nigerian university, I often get assigned PDFs to read, most of the time I do not want to read them. So, I wanted to create an application that could help me summarize PDFs and highlight the important parts, or even predict my exam questions. I just wanted to pass without reading!" - *Ndukwe Daniel*

---

**Made with ❤️ by [Ndukwe Daniel](https://github.com/PonmileDaniel) for ALX Software Engineering Program**

---

## 🐛 Known Issues

- PDF size limit is currently set to 1MB for optimal performance
- Processing time depends on document size and complexity
- Some complex PDF layouts might not be parsed perfectly

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/PonmileDaniel/readmeee/issues) page
2. Create a new issue if your problem isn't already reported
3. Reach out on Twitter [@PonmileDaniel](https://x.com/PonmileDaniel)

