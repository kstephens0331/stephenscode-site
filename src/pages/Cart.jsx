import React from 'react';
import axios from 'axios';

const Cart = () => {
  const handleCheckout = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput?.value;

    try {
      const res = await axios.post('https://api.stephenscode.dev/create-checkout-session', {
        email,
        items: [
          {
            name: 'Standard Website',
            price: 350,
          },
        ],
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert('Checkout session failed. Try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout.');
    }
  };

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h2 className="text-xl font-bold">Standard Website</h2>
        <p className="text-sm text-gray-400">
          Home, About, Services, Contact pages, Admin back office & customer login, Responsive design
        </p>
        <p className="text-right mt-2 text-lg font-semibold">$350.00</p>
      </div>
      <div className="mb-4">
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        />
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded"
      >
        Pay $371.88
      </button>
    </div>
  );
};

export default Cart;
