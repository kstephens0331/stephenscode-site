import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { stripePromise } from "../utils/stripe";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
   const navigate = useNavigate();
  const location = useLocation();
  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const tax = total * 0.0625;
const grandTotal = total + tax;

const handleCheckout = async () => {
  const stripe = await stripePromise;

  const response = await fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cartItems }),
  });

  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Checkout failed. No session URL returned.");
    console.log("Stripe response:", data);

  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded shadow flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-orange-600 font-semibold mt-1">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-between">
              <button
  onClick={() => navigate("/checkout-embedded", { state: { amount: total } })}
  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-semibold transition"
>
  Proceed to Checkout
</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
