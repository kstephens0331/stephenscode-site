import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../utils/stripe";
import { useCart } from "../context/CartContext";
import successImg from "../assets/success-check.png";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();

  const [clientSecret, setClientSecret] = useState(null);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const tax = total * 0.0625;
  const grandTotal = total + tax;

  const [email, setEmail] = useState("");

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(subtotal * 100) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartItems]);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "StephensCode Purchase",
          amount: Math.round(grandTotal * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(pr);
      });
    }
  }, [stripe, grandTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      setMessage("");
    }
    if (result.paymentIntent.status === "succeeded") {
  setPaymentSuccess(true);
  setMessage("");

  // Send receipt info to backend
  await fetch(`${import.meta.env.VITE_API_URL}/send-receipt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      items: cartItems,
      subtotal: total,
      tax,
      totalAmount: grandTotal,
    }),
  });
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto mt-20 space-y-6 border border-gray-200 animate-fadeIn"
    >
      {paymentSuccess ? (
  <div className="text-center space-y-4">
    <img
  src={successImg}
  alt="Success"
  className="mx-auto h-24 w-24"
/>
    <p className="text-xl font-semibold text-green-600">Payment Successful!</p>
  </div>
) : (
  <>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7a4 4 0 10-8 0v4m16 0v2a8 8 0 11-16 0V7a6 6 0 0112 0v4z" />
              </svg>
              Secure Checkout
            </h2>
            <p className="text-gray-500 text-sm">All transactions are encrypted & powered by Stripe.</p>
          </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* 🛒 Line Items and Totals */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">Your Order</h3>
    {cartItems.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-start bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
      >
        <div>
          <p className="font-medium text-gray-900">{item.title}</p>
          {item.description && (
            <p className="text-sm text-gray-500">{item.description}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-gray-800 font-semibold">${Number(item.price).toFixed(2)}</p>
        </div>
      </div>
    ))}

    {/* 💵 Totals */}
    <div className="pt-4 space-y-1 border-t mt-4">
      <p className="text-gray-700">
        Subtotal: <span className="float-right">${total.toFixed(2)}</span>
      </p>
      <p className="text-gray-700">
        Tax (6.25%): <span className="float-right">${tax.toFixed(2)}</span>
      </p>
      <p className="font-bold text-lg text-gray-900">
        Total: <span className="float-right">${grandTotal.toFixed(2)}</span>
      </p>
    </div>
  </div>

  <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full p-3 border rounded-md shadow-sm"
    placeholder="you@example.com"
  />
</div>

  {/* 💳 Card Input */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
    <CardElement className="p-4 border border-gray-300 rounded-md shadow-sm bg-white" />
  </div>
</div>

          {paymentRequest && (
            <div className="mt-4">
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Pay ${grandTotal.toFixed(2)}
          </button>

          {message && <p className="text-sm text-red-600 text-center mt-2">{message}</p>}
          <p className="text-xs text-center text-gray-400 mt-6">🛡️ Secured by Stripe • No card details are stored</p>
        </>
      )}
    </form>
  );
};

export default function CheckoutEmbedded() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}