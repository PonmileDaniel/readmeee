import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  //Scroll to a specific section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='fixed top-0 left-0 w-full h-16 bg-white flex justify-between items-center px-4 z-50'>
      <h1 className='text-3xl font-bold'>Readmee.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4 cursor-pointer' onClick={() => scrollToSection('home')}>Home</li>
        <li className='p-4 cursor-pointer' onClick={() => scrollToSection('service')}>Service</li>
        <li className='p-4 cursor-pointer' onClick={() => scrollToSection('about')}>About</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>

      <div className={`fixed left-0 top-0 w-[60%] h-full border-r bg-gray-100 ease-in-out duration-500 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
        <h1 className='text-3xl font-bold m-4'>Readmee.</h1>
        <ul className='uppercase p-4'>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => scrollToSection('home')}>Home</li>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => scrollToSection('service')}>Service</li>
          <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => scrollToSection('about')}>About</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
