import React, { useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProductCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sample Package 1", quantity: 2, price: 100 },
    { id: 2, name: "Sample Package 2", quantity: 1, price: 150 },
  ]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/company/product");
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal * 1.1;
  const discountedTotal = total - discount;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const uniquePackageCount = cartItems.length; // Count unique packages

  const applyDiscount = () => {
    // Logic for applying discount based on the discount code
    if (discountCode === "SAVE10") {
      setDiscount(total * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="flex justify-between p-6">
      {/* Left side: Shopping Cart and Table */}
      <div className="w-2/3 pr-4">
        <div className="flex items-center mb-4">
          {/* Back Button */}
          <MdOutlineArrowBackIosNew
            className="text-gray-800 text-xl cursor-pointer mr-2 hover:text-primary"
            onClick={handleBackClick}
          />
          <span className="text-xl font-semibold">Shopping Continue</span>
        </div>
        {/* Horizontal line */}
        <hr className="my-2 border-1 border-gray-300" />
        {/* Shopping Cart Title */}
        <h2 className="text-xl font-semibold mb-1 pt-4">Shopping Cart</h2>
        {/* Display total unique packages in cart */}
        <p className="text-sm mb-6">
          You have{" "}
          <span className="text-lg font-medium">{uniquePackageCount}</span>{" "}
          item(s) in your cart.
        </p>
        <div className="border-2 border-gray-300 rounded-xl bg-white">
          <Table>
            <TableCaption>Your shopping cart items.</TableCaption>
            <TableHeader className="text-lg text-black">
              <TableRow>
                <TableHead className="text-black">Name Package</TableHead>
                <TableHead className="text-black">Quantity</TableHead>
                <TableHead className="text-black">Price</TableHead>
                <TableHead className="text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-lg">{item.name}</TableCell>
                    <TableCell className="flex items-center text-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        -
                      </button>
                      <span className="mx-2 my-2 w-8 border text-center border-gray-300 rounded px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="text-green-600 hover:text-green-800 px-2"
                      >
                        +
                      </button>
                    </TableCell>

                    <TableCell className="text-lg font-medium">
                      ${item.price}
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-gray-800 hover:text-primary px-5"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center text-gray-500">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right side: Summary */}
      <div className="w-1/3 p-4 pt-10 pb-5 bg-[#565ABB] text-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>

        {/* Subtotal and Total */}
        <div className="flex justify-between">
          <span className="text-gray-200">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-200">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>

        {/* Discount Code Input */}
        <label className="block text-2sm font-medium mb-2">Discount Code</label>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border rounded-lg p-2 mb-4 text-gray-800"
        />
        <button
          onClick={applyDiscount}
          className="w-full bg-blue-400 hover:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg mb-4"
        >
          Apply
        </button>

        {/* Final Total */}
        <div className="flex justify-between mb-6">
          <span className="text-lg font-semibold">Total Price</span>
          <span className="text-lg font-semibold">
            ${discountedTotal.toFixed(2)}
          </span>
        </div>

        {/* Proceed to Checkout Button */}
        <button className="w-full h-12 bg-blue-400 hover:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default ProductCart;
