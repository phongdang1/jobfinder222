import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../assets/animation/loadingAnimation.json";

function GlobalLoadingMain({ isSubmiting }) {
  return (
    <div
      className={`${
        isSubmiting ? "flex" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50`}
    >
      <Lottie className="w-72 h-72" animationData={loadingAnimation} loop />
    </div>
  );
}

export default GlobalLoadingMain;
