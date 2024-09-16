import React from 'react';
import b2 from '../assets/b2.jpg';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/upload');
  }
  return (


    <div id='home' className='w-full h-screen flex flex-col justify-center items-center bg-gray-100' style={{
      backgroundImage: `url(${b2})`,
    }}>
      <div className='max-w-[800px] text-center'>
        <p className='text-blue-700 mb-4 font-bold p-2'>Enhancing pdf application with Ai</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Readmee AI .</h1>
        <div className='flex justify-center items-center '>
          <p className=' sm:text-4xl md:text-5xl font-bold text-blue-500 py-4'>PDF MADE EASY</p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-950 '>Readmee: Upload your document, ask anything, get answers instantly.</p>
        
        <button className='bg-blue-500 text-white w-[200px] rounded-md font-medium my-6 mx-auto py-3' onClick={handleClick}>Click me</button>
        <p className='text-red-700 mb-4 font-bold p-2'>Please upload PDF less than 1mb or 1mb</p>
        
      </div>
    </div>
  );
};

export default Hero;
