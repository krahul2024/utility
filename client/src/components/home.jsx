import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const docs_para =
    'Experience seamless document transformation with our versatile conversion tools. Effortlessly convert documents to and from a wide range of formats, including PDF, Word, Excel, and more. Unlock the power of document flexibility and discover the endless possibilities of different document type conversions. Explore the convenience and efficiency of document conversion and much more. Whether you need to convert PDFs to editable Word documents, create professional-looking Excel spreadsheets, or generate high-quality PDFs from your Word files, our document conversion services have got you covered. Start exploring the world of document transformation today and streamline your workflow with ease.';
  const image_para =
    "Experience the power of seamless image management with our cutting-edge image resizing and compression tools. Enhance your website's performance and user experience by effortlessly optimizing images to the perfect size and quality. Our advanced algorithms ensure that your visuals load quickly without sacrificing quality. Whether you're a photographer, web developer, or content creator, our platform provides the ideal solution to effortlessly resize and compress images for every purpose. Say goodbye to slow-loading pages and hello to a faster, more responsive web presence. Discover the benefits of image optimization today and transform your digital content with ease.";

  return (
    <div className="flex flex-col justify-start items-center h-screen p-4">
      <div className="flex flex-col gap-2 p-6 border shadow-lg border-gray-700 text-gray-200 text-lg max-w-[66%] rounded-lg mb-4">
        {docs_para}
        <NavLink className="text-orange-600"
        	to = '/documents'>
        	Explore the documents conversion tools...
        </NavLink>
      </div>
      <div className="flex flex-col gap-2 p-6 border shadow-lg border-gray-700 text-gray-200 text-lg max-w-[66%] rounded-lg">
        {image_para}
        <NavLink className="text-orange-600"
        	to = '/images'>
        	Explore the image compression and resizing tools...
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
