import React from 'react';

const FileViewer = ({ fileUrl, onClose ,fileName}) => {
  const handleClose = () => {
    onClose(); // Call the onClose function to close the file viewer
  };

  return (
    <>
      <div className="fixed inset-20 z-50 overflow-y-auto bg-gray-800 bg-opacity-60">
        <div className="relative max-w-screen-lg mx-auto p-4 sm:p-6 lg:p-8">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleClose}
              className="text-white hover:font-bold focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="w-full h-screen overflow-y-scroll">
            <iframe
              src={fileUrl}
              className="w-full h-full"
              title={fileName}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileViewer;
