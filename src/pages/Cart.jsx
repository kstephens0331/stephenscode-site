import React, { useState } from "react";

const Cart = () => {
  const [cartItems] = useState([
    {
      title: "Standard Website",
      description: "Home, About, Services, Contact pages, Admin back office & customer login, Responsive design",
      price: 350,
    },
  ]);

  const taxRate = 0.0625;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;

  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          email,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to redirect to Stripe Checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Secure Checkout</h2>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 shadow-sm">
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-right font-bold mt-2">${item.price.toFixed(2)}</p>
          </div>
        ))}

        <div className="border-t pt-4 space-y-1 text-right">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (6.25%): ${tax.toFixed(2)}</p>
          <p className="text-xl font-bold">Total: ${grandTotal.toFixed(2)}</p>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleCheckout}
          className="w-full bg-orange-600 text-white font-bold py-3 rounded-md hover:bg-orange-700 transition"
        >
          Pay ${grandTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Cart;
