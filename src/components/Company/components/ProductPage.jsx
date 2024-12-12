import React, { useState, useEffect } from "react";
import axios from "../../../fetchData/axios";
import ProductHero from "./ProductHero";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import postcard from "../../../assets/illustration/post.png";
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
import GlobalLoadingMain from "@/components/GlobalLoading/GlobalLoadingMain";
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [postPlans, setPostPlans] = useState([]);
  const [viewPlans, setViewPlans] = useState([]);
  const [postPrice, setPostPrice] = useState(0);
  const [viewPrice, setViewPrice] = useState(0);
  const [postPoints, setPostPoints] = useState(null); // State to store post plan points
  const [viewPoints, setViewPoints] = useState(null); // State to store view plan points
  const [selectedPostPlanId, setSelectedPostPlanId] = useState(null); // For selected Post plan ID
  const [selectedViewPlanId, setSelectedViewPlanId] = useState(null); // For selected View plan ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State loading

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
            setPostPoints(postPackages[0].value); // Set points for post package
            setSelectedPostPlanId(postPackages[0].id);
          }
          if (viewPackages.length > 0) {
            setViewPrice(viewPackages[0].price);
            setViewPoints(viewPackages[0].value); // Set points for view package
            setSelectedViewPlanId(viewPackages[0].id);
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
        setPostPoints(selectedProduct.value); // Set points for selected post plan
        setSelectedPostPlanId(selectedProduct.id);
      } else {
        setViewPrice(selectedProduct.price);
        setViewPoints(selectedProduct.value); // Set points for selected view plan
        setSelectedViewPlanId(selectedProduct.id);
      }
    }
  };

  const handleCreatePaymentViewCv = async () => {
    try {
      setIsSubmitting(true);
      const res = await createPaymentViewCv(selectedViewPlanId);
      if (res.data.errCode === 0) {
        const data = {
          packageId: selectedViewPlanId,
          amount: 1,
          userId: JSON.parse(localStorage.getItem("user_id")),
        };
        localStorage.setItem("orderData", JSON.stringify(data));
        const redirectUrl = `${res.data.link}`;
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.log("Lỗi thanh toán", res);
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreatePaymentHotPost = async () => {
    try {
      setIsSubmitting(true);
      const res = await createPaymentHotPost(selectedPostPlanId);
      if (res.data.errCode === 0) {
        const data = {
          packageId: selectedPostPlanId,
          amount: 1,
          userId: JSON.parse(localStorage.getItem("user_id")),
        };
        localStorage.setItem("orderData", JSON.stringify(data));
        const redirectUrl = `${res.data.link}`;
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.log("Lỗi thanh toán", res);
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-5">
      <GlobalLoadingMain isSubmiting={isSubmitting} />
      <div className="flex flex-col  bg-opacity-80 rounded-2xl mb-6">
        <ProductHero />
      </div>

      {/* Post Package Card */}
      <div
        data-aos="fade-right"
        className="flex justify-center items-center mx-auto max-w-6xl mb-8"
      >
        <div className="flex flex-col justify-between bg-transparent p-8 rounded-lg w-full">
          <Link to="/company/exchangePoint" className="flex">
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
              <h2 className="text-3xl font-semibold mb-5 text-center">
                <span className="text-primary">Post </span>Packages
              </h2>
              <div className="mb-4 flex gap-2 items-center">
                <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                Post with featured status.
              </div>
              <div className="mb-4 flex gap-2 items-center">
                <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                Show at the top of the list.
              </div>
              <div className="mb-4 flex gap-2 items-center">
                <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                Enjoy many benefits from this posting package.
              </div>
              <select
                className="w-full mb-4 p-2 border border-gray-400 rounded text-gray-700"
                onChange={(e) => handlePlanChange(e, "Post")}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a package...
                </option>
                {postPlans
                  .filter(
                    (plan) => plan.statusCode.toLowerCase() !== "inactive"
                  )
                  .map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
              </select>

              <div className="mb-4 p-1 flex justify-center items-center">
                <div className="mr-2 p-1 w-1/2 flex justify-center items-center bg-primary text-white rounded-md">
                  <p className="text-xl font-semibold">{`$${postPrice}`}</p>
                </div>

                <div className="gap-1 p-1 w-1/2 flex justify-center items-center bg-primary text-white rounded-md">
                  <p className="mr-2 text-xl font-semibold ml-4">{`${postPoints}`}</p>
                  <FaGift className="text-xl" />
                </div>
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
              className="w-full mb-4 p-2 border border-gray-400 rounded text-gray-700"
              onChange={(e) => handlePlanChange(e, "View")}
              defaultValue=""
            >
              <option value="" disabled>
                Select a package...
              </option>
              {viewPlans
                .filter((plan) => plan.statusCode.toLowerCase() !== "inactive") // Lọc các plan có statusCode không phải "Inactive"
                .map((plan) => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
            </select>

            {/* <div className=" flex justify-center items-center bg-gray-100">
              <p className="text-xl font-semibold">Price: {`$${viewPrice}`}</p>
            </div>
            <div className="mb-4 p-2 flex justify-center items-center bg-gray-100">
              <p className="text-xl font-semibold ml-4">
                Points:{` ${viewPoints}`}
              </p>{" "}
            </div> */}

            <div className="mb-4 p-1 flex justify-center items-center">
              <div className="mr-2 p-1 w-1/2 flex justify-center items-center bg-primary text-white rounded-md">
                <p className="text-xl font-semibold">{`$${viewPrice}`}</p>
              </div>

              <div className="gap-1 p-1 w-1/2 flex justify-center items-center bg-primary text-white rounded-md">
                <p className=" mr-2 text-xl font-semibold ml-4">{` ${viewPoints}`}</p>{" "}
                <FaGift className="text-xl" />
              </div>
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
