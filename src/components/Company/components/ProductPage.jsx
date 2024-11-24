import React, { useState, useEffect } from "react";
import axios from "../../../fetchData/axios";
import ProductHero from "./ProductHero";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import postcard from "../../../assets/images/img1.jpg";
import viewCandidate from "../../../assets/illustration/viewCandidate.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  createPaymentHotPost,
  createPaymentViewCv,
} from "../../../fetchData/Transaction";
const URL = "/getAllPackage";
import { FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [postPlans, setPostPlans] = useState([]);
  const [viewPlans, setViewPlans] = useState([]);
  const [postPrice, setPostPrice] = useState(0);
  const [viewPrice, setViewPrice] = useState(0);
  const [selectedPostPlanId, setSelectedPostPlanId] = useState(null); // For selected Post plan ID
  const [selectedViewPlanId, setSelectedViewPlanId] = useState(null); // For selected View plan ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        if (Array.isArray(response.data.data)) {
          const filteredData = response.data.data.filter(
            (product) => product.type !== "VIP"
          );
          setProducts(filteredData);

          const postPackages = filteredData.filter(
            (product) => product.type === "Post"
          );
          const viewPackages = filteredData.filter(
            (product) => product.type === "View"
          );

          setPostPlans(postPackages);
          setViewPlans(viewPackages);

          if (postPackages.length > 0) {
            setPostPrice(postPackages[0].price);
            setSelectedPostPlanId(postPackages[0].id); // Set default selected Post plan ID
          }
          if (viewPackages.length > 0) {
            setViewPrice(viewPackages[0].price);
            setSelectedViewPlanId(viewPackages[0].id); // Set default selected View plan ID
          }
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Error fetching data. Please try again later.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlanChange = (e, type) => {
    const selectedPlan = e.target.value;
    const selectedProduct =
      type === "Post"
        ? postPlans.find((plan) => plan.name === selectedPlan)
        : viewPlans.find((plan) => plan.name === selectedPlan);

    if (selectedProduct) {
      if (type === "Post") {
        setPostPrice(selectedProduct.price);
        setSelectedPostPlanId(selectedProduct.id); // Update selected Post plan ID
      } else {
        setViewPrice(selectedProduct.price);
        setSelectedViewPlanId(selectedProduct.id); // Update selected View plan ID
      }
    }
  };

  const handleCreatePaymentViewCv = async () => {
    const res = await createPaymentViewCv(selectedViewPlanId);
    if (res.data.errCode == 0) {
      let data = {
        packageId: selectedViewPlanId,
        amount: 1,
        userId: JSON.parse(localStorage.getItem("user_id")),
      };
      localStorage.setItem("orderData", JSON.stringify(data));
      // const userId = JSON.parse(localStorage.getItem("user_id"));
      // const packageId = selectedViewPlanId;
      const redirectUrl = `${res.data.link}`;
      console.log("Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } else {
      console.log("loi thanh toan", res);
    }
    console.log("Payment result:", selectedViewPlanId);
  };

  const handleCreatePaymentHotPost = async () => {
    const res = await createPaymentHotPost(selectedPostPlanId);
    if (res.data.errCode == 0) {
      let data = {
        packageId: selectedPostPlanId,
        amount: 1,
        userId: JSON.parse(localStorage.getItem("user_id")),
      };
      localStorage.setItem("orderData", JSON.stringify(data));
      // const userId = JSON.parse(localStorage.getItem("user_id"));
      // const packageId = selectedViewPlanId;
      const redirectUrl = `${res.data.link}`;
      console.log("Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } else {
      console.log("loi thanh toan", res);
    }
    console.log("Payment result:", selectedViewPlanId);
  };

  return (
    <div className="mb-5">
      <div className="flex flex-col  bg-opacity-80 rounded-2xl mb-6">
        <ProductHero />  
      </div>
    
      {/* Post Package Card */}
      <div
        data-aos="fade-right"
        className="flex justify-center items-center mx-auto max-w-6xl mb-8"
      >
        <div className="flex flex-col justify-between bg-transparent p-8 rounded-lg w-full">
        <Link 
      to="/company/exchangePoint"
      className="flex">
        <Button
          variant="outline"
          className="border border-primary mx-4 mb-14 bg-white flex  items-center gap-2 hover:text-primary"
        >
          <FaGift /> Exchange your point
        </Button>
      </Link>
          <div className="flex items-center justify-between">
            {/* Left - Image */}
             <div className="w-1/2 p-4">
            <img
              src={postcard}
              alt="Post Package Illustration"
              className="w-full rounded-md"
            />
          </div>
          
          {/* Right - Details */}
          <div className="w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-5 text-center ">
              <span className=" text-primary">Post </span>Packages
            </h2>
            <p className="mb-2">
              • Chọn gói đăng bài phù hợp với nhu cầu của bạn.
            </p>
            <p className="mb-4">
              • Tận hưởng nhiều lợi ích từ gói đăng bài này.
            </p>
            <select
              className="w-full mb-4 p-2 border border-gray-400 rounded"
              onChange={(e) => handlePlanChange(e, "Post")}
            >
              {postPlans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
            <div className="mb-4 p-2 border border-gray-400 rounded-md flex justify-center items-center bg-gray-100">
              <p className="text-xl font-semibold">{`$${postPrice}`}</p>
            </div>
            <Button
              onClick={handleCreatePaymentHotPost}
              className="w-full bg-white border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" /> Buy Now
            </Button>
          </div>
          </div>
         
        </div>
      </div>

      {/* View Package Card */}
      <div
        data-aos="fade-left"
        className="flex justify-center items-center mx-auto max-w-6xl"
      >
        <div className="flex items-center justify-between bg-transparent p-8 rounded-lg w-full">
          {/* Left - Details */}
          <div className="w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-5 text-center ">
              <span className=" text-primary">View </span>Packages
            </h2>
            <div className="mb-4 flex gap-2 items-center">
              <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
              Access candidate profiles to streamline the hiring process.
            </div>
            <div className="mb-4 flex gap-2 items-center">
              <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
              Unlock detailed CVs for targeted recruitment.
            </div>
            <div className="mb-4 flex gap-2 items-center">
              <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
              View the matching percentage of all candidates.
            </div>
            <select
              className="w-full mb-4 p-2 border border-gray-400 rounded focus:border-primary focus:ring-1 ring-primary"
              onChange={(e) => handlePlanChange(e, "View")}
            >
              {viewPlans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
            <div className="mb-4 p-2 flex justify-center items-center bg-gray-100">
              <p className="text-xl font-semibold">{`$${viewPrice}`}</p>
            </div>
            <Button
              onClick={handleCreatePaymentViewCv}
              className="w-full bg-white border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" /> Buy Now
            </Button>
          </div>
          {/* Right - Image */}
          <div className="w-1/2 p-4">
            <img
              src={viewCandidate}
              alt="View Package Illustration"
              className="w-full rounded-md"
            />
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ProductPage;
