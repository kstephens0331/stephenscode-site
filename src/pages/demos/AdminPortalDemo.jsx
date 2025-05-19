import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FaUserFriends,
  FaBoxOpen,
  FaFileInvoice,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaPaperPlane,
  FaDownload,
} from "react-icons/fa";

export default function AdminPortalDemo() {
  const [activeTab, setActiveTab] = useState("quotes");

  // Customers
  const [customers, setCustomers] = useState([]);
  const [customerModal, setCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({ name: "", email: "", phone: "" });

  // Products
  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", sku: "", price: "" });

  // Quotes
  const [quotes, setQuotes] = useState([]);
  const [quoteModal, setQuoteModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [emailTarget, setEmailTarget] = useState("");
  const [quoteForm, setQuoteForm] = useState({
    customer: "",
    items: [{ description: "", amount: "" }],
  });
  const pdfRef = useRef(null);
  // Customer Handlers
  const addCustomer = (e) => {
    e.preventDefault();
    setCustomers([...customers, customerForm]);
    setCustomerForm({ name: "", email: "", phone: "" });
    setCustomerModal(false);
  };

  const deleteCustomer = (index) => {
    const updated = [...customers];
    updated.splice(index, 1);
    setCustomers(updated);
  };

  const renderCustomers = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customers</h2>
        <button
          onClick={() => setCustomerModal(true)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm flex items-center gap-2"
        >
          <FaPlus /> Add Customer
        </button>
      </div>
      {customers.length === 0 ? (
        <p className="text-gray-400 italic">No customers yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-700 rounded">
          <table className="min-w-full bg-white text-black text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteCustomer(i)}
                      className="text-red-600 text-xs flex items-center gap-1 hover:text-red-800"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  // Product Handlers
  const addProduct = (e) => {
    e.preventDefault();
    setProducts([...products, productForm]);
    setProductForm({ name: "", sku: "", price: "" });
    setProductModal(false);
  };

  const deleteProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const renderProducts = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setProductModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-400 italic">No products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-white text-black rounded shadow p-4 space-y-2">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm">SKU: {p.sku}</p>
              <p className="text-sm">Price: ${p.price}</p>
              <button
                onClick={() => deleteProduct(i)}
                className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );  // Quote Handlers
  const handleLineChange = (index, field, value) => {
    const updated = [...quoteForm.items];
    updated[index][field] = value;
    setQuoteForm({ ...quoteForm, items: updated });
  };

  const addLineItem = () => {
    setQuoteForm({
      ...quoteForm,
      items: [...quoteForm.items, { description: "", amount: "" }],
    });
  };

  const removeLineItem = (index) => {
    const updated = [...quoteForm.items];
    updated.splice(index, 1);
    setQuoteForm({ ...quoteForm, items: updated });
  };

  const getQuoteTotal = () =>
    quoteForm.items.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  const submitQuote = (e) => {
    e.preventDefault();
    setQuotes([...quotes, { ...quoteForm, total: getQuoteTotal() }]);
    setQuoteForm({ customer: "", items: [{ description: "", amount: "" }] });
    setQuoteModal(false);
  };

  const exportPDF = async (quoteIndex) => {
    const element = document.getElementById(`quote-pdf-${quoteIndex}`);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Quote_${quoteIndex + 1}.pdf`);
  };

  const sendEmailSim = (e) => {
    e.preventDefault();
    alert(`Quote sent to ${emailTarget} (simulation)`);
    setEmailTarget("");
    setEmailModal(false);
  };

  const renderQuotes = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quotes</h2>
        <button
          onClick={() => setQuoteModal(true)}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm flex items-center gap-2"
        >
          <FaPlus /> Create Quote
        </button>
      </div>
      {quotes.length === 0 ? (
        <p className="text-gray-400 italic">No quotes yet.</p>
      ) : (
        <div className="space-y-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              id={`quote-pdf-${i}`}
              className="bg-white text-black rounded p-6 shadow relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setEmailModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <FaPaperPlane /> Send
                </button>
                <button
                  onClick={() => exportPDF(i)}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <FaDownload /> PDF
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Quote #{i + 1} — {q.customer}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {q.items.map((item, j) => (
                  <li key={j}>
                    {item.description} — ${item.amount}
                  </li>
                ))}
              </ul>
              <p className="font-bold mt-2">Total: ${q.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
  return (
    <div className="flex h-screen bg-[#0e0e0e] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] shadow-xl flex flex-col">
        <div className="p-6 text-2xl font-extrabold text-orange-400 border-b border-gray-800">
          Admin Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("customers")}
            className={`flex items-center gap-3 px-4 py-2 rounded w-full text-left hover:bg-[#2a2a2a] ${
              activeTab === "customers" ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <FaUserFriends /> Customers
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 px-4 py-2 rounded w-full text-left hover:bg-[#2a2a2a] ${
              activeTab === "products" ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <FaBoxOpen /> Products
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-3 px-4 py-2 rounded w-full text-left hover:bg-[#2a2a2a] ${
              activeTab === "quotes" ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <FaFileInvoice /> Quotes
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400 flex items-center justify-between">
          <span>Demo View</span>
          <FaSignOutAlt className="text-gray-600" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <motion.h1
          className="text-3xl font-bold text-orange-400 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {activeTab === "customers" && renderCustomers()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "quotes" && renderQuotes()}
        </motion.div>
        {/* Customer Modal */}
        <AnimatePresence>
          {customerModal && (
            <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.form
                onSubmit={addCustomer}
                className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg space-y-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-bold">Add Customer</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                />
                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCustomerModal(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Save Customer
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Modal */}
        <AnimatePresence>
          {productModal && (
            <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.form
                onSubmit={addProduct}
                className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg space-y-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-bold">Add Product</h2>
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="SKU"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  className="w-full border p-2 rounded"
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />
                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setProductModal(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Save Product
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote Modal */}
        <AnimatePresence>
          {quoteModal && (
            <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.form
                onSubmit={submitQuote}
                className="bg-white text-black rounded-lg p-6 w-full max-w-lg shadow-lg space-y-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-bold">Create New Quote</h2>
                <input
                  type="text"
                  placeholder="Customer Name"
                  required
                  className="w-full border p-2 rounded"
                  value={quoteForm.customer}
                  onChange={(e) =>
                    setQuoteForm({ ...quoteForm, customer: e.target.value })
                  }
                />
                {quoteForm.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Description"
                      required
                      className="flex-1 border p-2 rounded"
                      value={item.description}
                      onChange={(e) => handleLineChange(index, "description", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      required
                      className="w-24 border p-2 rounded"
                      value={item.amount}
                      onChange={(e) => handleLineChange(index, "amount", e.target.value)}
                    />
                    {quoteForm.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLineItem(index)}
                        className="text-xs text-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLineItem}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add Line Item
                </button>
                <div className="text-right font-semibold">
                  Total: ${getQuoteTotal().toFixed(2)}
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setQuoteModal(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
                  >
                    Save Quote
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Modal */}
        <AnimatePresence>
          {emailModal && (
            <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.form
                onSubmit={sendEmailSim}
                className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg space-y-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-bold">Send Quote via Email</h2>
                <input
                  type="email"
                  placeholder="Recipient Email"
                  required
                  className="w-full border p-2 rounded"
                  value={emailTarget}
                  onChange={(e) => setEmailTarget(e.target.value)}
                />
                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setEmailModal(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Send Quote
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
