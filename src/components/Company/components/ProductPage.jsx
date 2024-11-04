import React, { useState, useEffect } from "react";
import axios from "../../../fetchData/axios";
import ProductHero from "./ProductHero";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import postcard from "../../../assets/images/img1.jpg";

const URL = "/getAllPackage";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [postPlans, setPostPlans] = useState([]);
  const [viewPlans, setViewPlans] = useState([]);
  const [postPrice, setPostPrice] = useState(0);
  const [viewPrice, setViewPrice] = useState(0);
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

          if (postPackages.length > 0) setPostPrice(postPackages[0].price);
          if (viewPackages.length > 0) setViewPrice(viewPackages[0].price);
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
      type === "Post"
        ? setPostPrice(selectedProduct.price)
        : setViewPrice(selectedProduct.price);
    }
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-center bg-opacity-80 rounded-2xl mb-6">
        <ProductHero />
      </div>

      {/* Post Package Card */}
      <div
        data-aos="fade-right"
        className="flex justify-center items-center mx-auto max-w-6xl mb-8"
      >
        <div className="flex items-center justify-between bg-transparent p-8 rounded-lg w-full">
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
            <h2 className="text-3xl font-semibold mb-5 text-center text-blue-700 ">
              Post Packages
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
            <button className="w-full bg-white border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white flex items-center justify-center">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Animated Arrow */}
      <div className="flex justify-center mb-8 animate-bounce">
        <FaArrowDown className="text-3xl text-gray-600" />
      </div>

      {/* View Package Card */}
      <div
        data-aos="fade-left"
        className="flex justify-center items-center mx-auto max-w-6xl"
      >
        <div className="flex items-center justify-between bg-transparent p-8 rounded-lg w-full">
          {/* Left - Details */}
          <div className="w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-5 text-center text-green-500">
              View Packages
            </h2>
            <p className="mb-2">• Khám phá nhiều gói xem với giá cả hợp lý.</p>
            <p className="mb-4">• Chọn gói xem tốt nhất cho nhu cầu của bạn.</p>
            <select
              className="w-full mb-4 p-2 border border-gray-400 rounded"
              onChange={(e) => handlePlanChange(e, "View")}
            >
              {viewPlans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
            <div className="mb-4 p-2 border border-gray-400 rounded-md flex justify-center items-center bg-gray-100">
              <p className="text-xl font-semibold">{`$${viewPrice}`}</p>
            </div>
            <button className="w-full bg-white border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white flex items-center justify-center">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
          {/* Right - Image */}
          <div className="w-1/2 p-4">
            <img
              src={postcard}
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
