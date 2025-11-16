import React from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-center text-white pt-20">Your cart is empty.</p>;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.0825;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleCheckout = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const res = await axios.post(
        'https://api.stephenscode.dev/create-checkout-session',
        {
          email,
          items: cartItems.map((item) => ({
            title: item.title,
            price: item.price,
            description: item.description,
            quantity: item.quantity,
          })),
        }
      );

      if (res.data?.url) {
        await addDoc(collection(db, 'orders'), {
          email,
          items: cartItems,
          subtotal,
          tax,
          total,
          createdAt: serverTimestamp(),
        });

        clearCart();
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
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  −
                </button>
                <span className="text-white">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <FaTrash
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer text-red-400 hover:text-red-600 text-lg"
                title="Remove item"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="text-sm text-gray-400 mb-2">
        Subtotal: ${subtotal.toFixed(2)}<br />
        Tax: ${tax.toFixed(2)}<br />
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>

      <button
        onClick={clearCart}
        className="mb-4 w-full text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Clear Cart
      </button>

      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-4"
      />

      <button
        onClick={handleCheckout}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded"
      >
        Pay ${total.toFixed(2)}
      </button>
    </div>
  );
};

export default Cart;
