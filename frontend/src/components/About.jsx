import React from 'react';

const About = () => {
    return (
        <div id="about" className='w-full bg-black py-16 px-4'>
      <div className='max-w-[1240px] mx-auto text-center'>
        {/* Project Description */}
        <h2 className='text-4xl font-bold mb-6 text-white underline'><i>About Readmee</i></h2>
        <p className='text-lg mb-6 text-white'>
          Hi, My name is Ndukwe Daniel and this is My Foundation project for ALX_SE the name of my application is called <strong>Readmee</strong>.  <strong>Readmee</strong> is a PDF application that allows users to upload and interact with documents easily. With built-in Ai, users can ask questions about the uploaded PDF and receive real-time, relevant answers based on the document's content
        </p>
        
        {/* Inspiration */}
        <h3 className='text-2xl font-semibold mb-5 mt-20 text-white underline'>What Inspired Me</h3>
        <p className='text-lg mb-6 text-white'>
        The inspiration behind <i><strong>Readmee</strong></i> was my laziness! As a student in a Nigerian university, I often get assigned PDFs to read, most of the time I do not want to read them. So, I wanted to create an application that could help me summarize PDFs and highlight the important parts, or even predict my exam questions. I just wanted to pass without reading, so many thing i would read just to be asked a few in the hall. But as the world would have it, the application was not able to predict my exam questions. Thank you for listening 💜.
        </p>
        
        {/* Social Links */}
        <h3 className='text-2xl font-semibold mb-4 text-white'>Follow Me</h3>
        <div className='flex justify-center space-x-8'>
          {/* Twitter Link */}
          <a
            href='https://x.com/PonmileDaniel'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            Twitter
          </a>

          <a
            href='https://github.com/PonmileDaniel'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            Github
          </a>
          
        </div>
      </div>
    </div>
    )
}
export default About;