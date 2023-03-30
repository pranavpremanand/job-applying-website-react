import React from "react";
import SuccessImg from "../Imgs/big-green-check.png";

const Success = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3 justify-center items-center w-11/12">
        <img src={SuccessImg} alt="" />
        <h3 className="capitalize font-semibold text-center text-2xl sm:text-3xl">
          application submitted
        </h3>
        <p className="text-sm sm:text-base text-center">
          Thanks for your interest!
        </p>
        <p className="text-sm sm:text-base text-center">
          Our review team will review your application and call you for
          interview
        </p>
      </div>
    </div>
  );
};

export default Success;
