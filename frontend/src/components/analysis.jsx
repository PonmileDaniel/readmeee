import React from 'react';
import Screen from '../assets/screen.jpg';
import Chat from '../assets/chat1.jpg';
import Chat1 from '../assets/pp.jpg';

const Analysis = () => {
  return (
    <div id = "service" className='w-full bg-white py-16 px-4'>
      {/* First Section */}
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Screen} alt="/" />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00d] font-bold'>UPLOAD SERVICE</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manages Upload of PDF</h1>
          <p>This is the upload section of the application where users can upload a PDF. Once uploaded, the PDF is chunked, and each chunk is assigned an ID and stored in the Pinecone database as vectors. After this, the user is redirected to the chat feature of the application. I’ve limited the upload size to PDFs under 1MB to ensure the process remains fast. The smaller the file size, the faster the chunking and processing will be.</p>
          <button className='bg-blue-500 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Thank you 💜</button>
        </div>
      </div>


      {/* Second Section with reversed layout */}
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 mt-20'>
        {/* Text comes first in this section */}
        <div className='flex flex-col justify-center'>
          <p className='text-[#00d] font-bold px-4'>CHAT SECTION</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 px-4'>Messsaging aspect</h1>
          <p className='px-4'>This is the chat feature where users can ask questions specifically about the PDF they uploaded. The system is designed to only provide responses based on the content of the uploaded document. Any questions outside the scope of the PDF will not be answered, and the user will receive a message indicating that the information is not available in the document. This ensures focused and relevant interactions, keeping the conversation centered on the content of the uploaded file. </p>
          <button className='bg-blue-500 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Thank you 💜</button>
        </div>
        {/* Image comes second */}
        <img className='w-[500px] mx-auto my-4' src={Chat} alt="/" />
      </div>


         {/* Third Section */}
         <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 mt-20'>
        <img className='w-[500px] mx-auto my-4' src={Chat1} alt="/" />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00d] font-bold'>RESPONSE</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Message of the application showing it worked</h1>
          <p>I uploaded a PDF on software engineering, and the system provided responses based on the content of the uploaded document. While it works to a certain extent, there is room for improvement to make the responses even more accurate and aligned with the document's content. </p>
          <button className='bg-blue-500 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Thank you 💜</button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

