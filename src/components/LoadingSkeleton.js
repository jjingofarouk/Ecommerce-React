import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ count = 6 }) => (
  <>
    <div className="col-12 py-5 text-center">
      <Skeleton height={40} width={560} />
    </div>
    {[...Array(count)].map((_, index) => (
      <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
        <Skeleton height={592} />
      </div>
    ))}
  </>
);

export default LoadingSkeleton;