import React, {useState, useEffect } from 'react' 
import {NavLink} from 'react-router-dom' 

const ConvertOptions = ({ options , expandId}) => {

	return (<> 
		<div>
			{options.map((option) => (
				<div className="flex items-center gap-12 justify-between min-w-[600px] border-[1px] border-gray-700 p-2 rounded-lg my-1 text-blue-200 hover:border-gray-600 hover:bg-gray-900">
					<span className="px-6">{option}</span>
					<button className="flex gap-2 border border-gray-900 shadow-lg rounded-md px-6 py-1.5 bg-blue-700 text-blue-200 hover:font-semibold hover:text-black">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
						  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
						</svg>						
						<span>convert</span>
					</button>
				</div>
			))}
		</div>
	</>)
}


export default ConvertOptions; 