import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full sm:w-2/3 p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      </div>
      <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-200"></div>
    </div>
  );
};

export default SkeletonCard;
