import React from 'react';
import logo from "../assets/logo_bg.png";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitterSquare } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-red-900 mb-20 flex items-center justify-between py-6">
      <div className='flex flex-shrink-0 items-center'>
        <img src={logo} alt="logo" width={100} height={100}/>
      </div>
      <div className="flex space-x-4">
        <FaGithub className="text-4xl text-white" />
        <FaLinkedin className="text-4xl text-white" />
        <FaInstagram className="text-4xl text-white" />
        <FaTwitterSquare className="text-4xl text-white" />
      </div>
    </nav>
  );
}

export default Navbar;