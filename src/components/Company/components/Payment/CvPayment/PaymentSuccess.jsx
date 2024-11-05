import React, { useState, useEffect } from "react";
import "../../../../../assets/css/payment-success.css";
import Typewriter from "typewriter-effect";
import checkCircleAnimation from "../../../../../assets/svgicon/check-circle-animation.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { executePaymentViewCv } from "@/fetchData/Transaction";
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
const PaymentSuccess = () => {
  const query = useQuery();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typewriter, setTypewriter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    if (orderData) {
      orderData.paymentId = query.get("paymentId");
      orderData.token = query.get("token");
      orderData.PayerID = query.get("PayerID");
      orderData.userId = JSON.parse(localStorage.getItem("user_id"));
      orderData.packageId = JSON.parse(localStorage.getItem("orderData")).packageId;
      // console.log("Payment ID:", orderData.paymentId);
      // console.log("Token:", orderData.token);
      console.log("data nè:", orderData);
      createNewOrder(orderData);
    } else {
      setMessage("Incorrect order");
    }
    setShowMessage(true);
    const timeout = setTimeout(() => {
      setTypewriter(true);
    }, 1500);
    const buttonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 6500);
    return () => {
      clearTimeout(timeout, buttonTimeout);
    };
  }, []);
  useEffect(() => {}, []);
  const createNewOrder = async (data) => {
    console.log("data ",data)
    let res = await executePaymentViewCv(data);
    if (res && res.data.errCode === 0) {
      //   toast.success(res.errMessage);
      localStorage.removeItem("orderData");
      setMessage(
        "Get started to view full details of your desired candidates with matching percentage !!!"
      );
    } else {
      setMessage("Incorrect order 1");
      console.log("respone ne", res);
      console.log("data truyen vao",data)
    }
  };
  return (
    <>
      <section className="pt-[22vh] overflow-x-hidden overflow-y-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block mx-auto mb-6">
              <div className="success-animation">
                <Lottie
                  animationData={checkCircleAnimation}
                  loop={false}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </span>
            <span className="block mb-1 text-xl font-bold text-indigo-500">
              SUCCESS
            </span>
            <h1
              className={`text-4xl font-semibold my-5 ${
                showMessage ? "animate-text-open" : "opacity-0"
              }`}
            >
              <span className="clip-text">PAYMENT SUCCESSFULLY !!!</span>
            </h1>
            {typewriter && (
              <p className="text-md font-normal mb-12">
                <TypewriterEffect message={message} />
              </p>
            )}

            {showButton && (
              <Link
                className="group relative inline-block h-12 w-1/3 xs:w-60 bg-white text-primary hover:bg-primary border-2 border-primary hover:text-white font-semibold rounded-md animate-fade-in py-2 transition"
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

export default PaymentSuccess;
