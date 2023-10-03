import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FileViewer from './fileViewer'
import docs from '../assets/formats'
import ConvertOptions from './convertOptions'
import axios from 'axios'

const Documents = () => {
  const [files, setFiles] = useState([]); // Initialize as an empty array
  const [views, setViews] = useState([]); // for viewing the file content 
  const [selectedFile, setSelectedFile] = useState(-1); 
  const [expandIndex, setExpandIndex] = useState(-1); 

  const handleFileChange = (e) => {
	  const allFiles = Array.from(e.target.files);
	  const contents = [];

	  allFiles.forEach((file) => {
	    const blob = new Blob([file], { type: file.type });
	    const url = URL.createObjectURL(blob);
	    contents.push(url);
	  });

	  setViews(contents);
	  setFiles(allFiles); // Update the state with the selected files
	};


  const handleDragAndDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleView = (index) => {
  	setSelectedFile(index); 
  }

  const handleClose = (index) => {
  	setSelectedFile(-1); 
  }

  const handleExpansion = (index) => {
  	if(expandIndex == -1) setExpandIndex(index); 
  	else setExpandIndex(-1); 
  }

  const getOptions = (filename, index) => {
  	if(filename){
  		const names = filename?.split('.'); 
	  	const type = names[names?.length-1]
	  	const options = docs[type]['to']; 
	  	return options; 
  	}
  	return []; 
  }
  const available_formats = (filename, index) => {
  	if(filename){
  		const options = getOptions(filename, index);  
	  	return (
	  		<div className="flex mt-2">
	  		<div>
	  		{expandIndex !== index && options.length>0 && options.map((item, index) => (
	  			<span className="text-blue-200 px-1"
	  				key={index}>{`${item}${options.length-1 !== index? ', ' : ' '}`}</span>
	  		))}
	  		{expandIndex === index && (
	  			<span className="text-blue-200 px-1">
	  				Convert to...
	  			</span>
	  		)}
	  	</div>
	  	<button onClick = {() => handleExpansion(index)}
	  		className="text-blue-300 px-6">
	  		{expandIndex !== index ? (
	  			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
					</svg>
	  		) : ( 
	  			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
					</svg>
	  		)}
	  	</button>
	  </div>
	  )}
  	return (<> </>)
  }

  // for uploading the files to s3
  const uploadFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of files) formData.append('files', file);

    // sending to backend 
    try {
        const response = await axios.post(
            '/upload/docs',
            formData, { withCredentials: true }
        );
        console.log({ response })
    } catch (error) {
        console.log({ error })
    }
	}

 console.log(docs, available_formats(files[0]?.name), expandIndex)


  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        {/* ---------- Convert from text file to/from pdf file ----------- */}
        <div className="flex gap-4 items-center justify-center"
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDragAndDrop}
        >
          <label
            htmlFor="fileInput"
            className="mt-8 flex border py-3 gap-16 rounded-lg px-12 border-gray-600 cursor-pointer justify-between"
          >
            <span className="p-1">Upload your files...</span>
            <span className="ml-4 mt-1">
	             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-5 h-6">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
							</svg>
            </span>
          </label>
          <button onClick={uploadFiles}
          	className="flex gap-2 justify-center border border-gray-950 mt-8 py-4 px-8 bg-green-600 rounded-lg">
          	Upload
          	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
						  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
						</svg>
          </button>

          <input
            className="hidden"
            type="file"
            multiple
            accept=".txt,.pdf,.doc,.docx"
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col justify-center items-center p-4">
          <div className="py-4 px-16 text-center mb-4 text-lg font-semibold text-gray-200">
            {`You have uploaded ${files.length} file(s), click on the filename to view it. Below the file-name is list of all the file formats to which it can be converted.`}
          </div>
          {/*---------Displaying all the uploaded files---------------*/}
          <div className="flex flex-col items-center">
            {files?.map((file, index) => (<>
            	<div className="flex gap-12 py-2 px-2 my-4 justify-between items-center min-w-[600px] border-b-[1px] rounded-lg border-blue-800">
	              <div
	                key={index}
	                className="flex flex-col px-2 items-start"
	              >
	                <button onClick = {() => handleView(index)}
	                  title="view this file"
	                  className="text-lg text-gray-300"
	                >
	                  {file.name }
	                </button>
	                <div className="mb-2">
		              	{available_formats(file.name, index)}
		              </div>
	              </div>
	              <button title="Remove this file" className="text-rose-500">
	                  <svg
	                    xmlns="http://www.w3.org/2000/svg"
	                    fill="none"
	                    viewBox="0 0 24 24"
	                    strokeWidth={1.5}
	                    stroke="currentColor"
	                    className="w-6 h-6"
	                  >
	                    <path
	                      strokeLinecap="round"
	                      strokeLinejoin="round"
	                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
	                    />
	                  </svg>
	                </button>
              </div>
              {expandIndex !== -1 && expandIndex === index && (
              <div className="flex gap-12 px-2 justify-between items-center border-b-[1px] rounded-lg border-blue-800">
              	<ConvertOptions options={getOptions(file.name, index)} expandId={index} />
              </div>
              )}
            </>))}
          </div>
        </div>
      )}

      {selectedFile !== -1 && (
      	<FileViewer fileUrl = {views[selectedFile]} fileName={files[selectedFile].name} onClose={handleClose} /> 
      )}
    </>
  );
};

export default Documents;
