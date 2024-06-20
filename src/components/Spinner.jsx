import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <RotatingLines
      visible={true}
      height="50"
      width="50"
      strokeColor="#284B63"
      strokeWidth="5"
      animationDuration="0.5"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
