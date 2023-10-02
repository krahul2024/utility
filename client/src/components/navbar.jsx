import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '/images/logo.jpg'
const Navbar = () => {
 

  return (
    <div className="py-2 px-12 md:px-16 lg:px-24 xl:px-32 xxl:px-48 border-[1px] border-gray-950 shadow-sm shadow-gray-800">
    	<div className="flex items-center justify-between gap-3 py-2 px-4 md:px-8 lg:px-16 xl:px-24">
    		<NavLink to="/" className="flex gap-4 items-center">
	    		<img 
	    			src={Logo} alt=""
	    			className="h-10 rounded-full"
	    			/>
	    		<span className="text-xl font-semibold text-gray-200">Utility</span>
    		</NavLink>

    		<div className="flex gap-8">
    			<NavLink to={'/documents'}
    				 className="text-gray-200 hover:text-white hover:font-semibold">
    				Documents
    			</NavLink>
    			<NavLink to={'/images'}
    				className="text-gray-200 hover:text-white hover:font-semibold">
    				Images
    			</NavLink>
    		</div>

    		<div className="">
    			<button className="flex gap-2 rounded-full border-[1px] p-1.5 border-gray-700 shadow-md hover:p-2">
    				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
					</svg>
    				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
    			</button>
    		</div>
    	</div>

    </div>
  );
};

export default Navbar;
