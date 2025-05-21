import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-center text-white pt-20">Your cart is empty.</p>;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const taxRate = 0.0825;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleCheckout = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput?.value;

    try {
      const res = await axios.post('https://api.stephenscode.dev/create-checkout-session', {
        email,
        items: cartItems.map(item => ({
          name: item.title,
          price: item.price,
          description: item.description,
        })),
      });

      if (res.data?.url) {
        clearCart(); // Optional: clear cart after redirect
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
    <div className="p-6 text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item, idx) => (
        <div key={idx} className="bg-gray-800 p-4 rounded mb-4 shadow">
          <div className="flex justify-between items-center">
