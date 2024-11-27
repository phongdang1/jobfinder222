import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../assets/animation/loadingAnimation.json";

function GlobalLoading({ isSubmiting }) {
  return (
    <div
      className={`${
        isSubmiting ? "flex" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center opacity-55 `}
    >
      <Lottie animationData={loadingAnimation} loop />
    </div>
  );
}

export default GlobalLoading;
