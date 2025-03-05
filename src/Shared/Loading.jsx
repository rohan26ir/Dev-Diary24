import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-100 shadow-lg shadow-blue-500/50"></div>
        <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce delay-200 shadow-lg shadow-green-500/50"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce delay-300 shadow-lg shadow-red-500/50"></div>
      </div>
    </div>
  );
};

export default Loading;
