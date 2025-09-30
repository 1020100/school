import React from 'react';

const Preloader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-full h-full border-4 border-gray-300 rounded-full"></div>
        <div className="absolute w-full h-full border-t-4 border-b-4 border-accent-primary rounded-full animate-spin"></div>
        <svg className="w-10 h-10 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.232 6.232z" />
        </svg>
      </div>
    </div>
  );
};

export default Preloader;