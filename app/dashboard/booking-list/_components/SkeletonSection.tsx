import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonSection: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="h-8 bg-gray-200 rounded w-2/5 mb-4"></div>
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default SkeletonSection;
