import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-12">
        <h1 className="text-[3rem]">Not Found</h1>
      </div>
    </>
  );
}

export default NotFound;
