import React, { useState, useEffect } from "react";
import "../../../../../assets/css/payment-success.css";
import Typewriter from "typewriter-effect";
import cancelAnimation from "../../../../../assets/svgicon/cancel-animation.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { executePaymentHotPost, executePaymentViewCv } from "@/fetchData/Transaction";
import toast from "react-hot-toast";

const TypewriterEffect = ({ message }) => {
  return (
    <Typewriter
      options={{
        strings: [message],
        autoStart: true,
        loop: false,
        deleteSpeed: 50,
        delay: 20,
        cursor: "",
        deleteAll: 20,
      }}
    />
  );
};
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const PostPaymentCancel = () => {
  const query = useQuery();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typewriter, setTypewriter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    setShowMessage(true);
    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 1500);
    return () => {
      clearTimeout(buttonTimeout);
    };
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      <section className="pt-[22vh] overflow-x-hidden overflow-y-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block mx-auto mb-6">
              <div className="success-animation">
                <Lottie
                  animationData={cancelAnimation}
                  loop={true}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </span>
            <span className="block mb-1 text-xl font-bold text-red-500">
              CANCEL
            </span>
            <h1
              className={`text-4xl font-semibold my-5 ${
                showMessage ? "animate-text-open" : "opacity-0"
              }`}
            >
              <span className="clip-text">PAYMENT CANCELLED !!!</span>
            </h1>
            {typewriter && (
              <p className="text-md font-normal mb-12">
                <TypewriterEffect message={message} />
              </p>
            )}

            {showButton && (
              <Link
                className="group relative inline-block h-12 w-1/3 xs:w-60 bg-white text-red-500 hover:bg-red-500 border-2 border-red-500 hover:text-white font-semibold rounded-md animate-fade-in py-2 transition"
                to="/company/dashboard"
              >
                Back to Home
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostPaymentCancel;
