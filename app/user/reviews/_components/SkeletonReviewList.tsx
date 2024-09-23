import React from "react";

const SkeletonReviewList: React.FC = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-4 w-full bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonReviewList;