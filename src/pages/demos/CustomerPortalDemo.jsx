import React, { useState, useEffect } from "react";
import {
  FaFileInvoiceDollar,
  FaFileSignature,
  FaClipboardCheck,
  FaComments,
  FaSignOutAlt,
  FaPaperPlane,
  FaDownload,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const mockAdminData = {
  quotes: [
    {
      id: 101,
      customer: "John Doe",
      total: 4800,
      items: [
        { description: "Kitchen Remodel", amount: 3000 },
        { description: "Lighting Upgrade", amount: 1800 },
      ],
    },
  ],
  invoices: [
    {
      id: "INV-3021",
      amount: 2200,
      due: "2025-05-18",
      paid: false,
    },
    {
      id: "INV-3020",
      amount: 3500,
      due: "2025-04-01",
      paid: true,
    },
  ],
};

export default function CustomerPortalDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([
    { sender: "Admin", text: "Welcome to your project portal!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [quoteEmailModal, setQuoteEmailModal] = useState(false);
  const [quoteEmailTarget, setQuoteEmailTarget] = useState("");
  const [pdfTargetId, setPdfTargetId] = useState(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const exportPDF = async (elementId) => {
    const element = document.getElementById(elementId);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Quote_${elementId}.pdf`);
  };
  return (
    <div className="flex h-screen bg-[#f9f9f9] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b border-gray-200">
          Customer Portal
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          {[
            { id: "dashboard", label: "Dashboard", icon: FaClipboardCheck },
            { id: "quotes", label: "Quotes", icon: FaFileSignature },
            { id: "invoices", label: "Invoices", icon: FaFileInvoiceDollar },
            { id: "tracker", label: "Project Tracker", icon: FaClipboardCheck },
            { id: "messages", label: "Messages", icon: FaComments },
            { id: "account", label: "Account Settings", icon: FaClipboardCheck },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-2 rounded w-full text-left hover:bg-gray-100 ${
                activeTab === id ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t text-xs text-gray-500 flex justify-between">
          <span>Logged in as Client</span>
          <FaSignOutAlt />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative bg-[#f9f9f9]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-700 capitalize">{activeTab}</h1>
          <p className="text-sm text-gray-500">
            {activeTab === "dashboard" && "Summary of your recent activity."}
            {activeTab === "quotes" && "View and download your quotes."}
            {activeTab === "invoices" && "Invoice history and status."}
            {activeTab === "tracker" && "Current project status."}
            {activeTab === "messages" && "Talk with your coordinator."}
            {activeTab === "account" && "Update your personal information."}
          </p>
        </div>
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded p-6">
              <h3 className="font-semibold mb-2">Latest Quote</h3>
              <p className="text-sm text-gray-600">“Kitchen Update” — $4,800</p>
              <p className="text-xs text-gray-400 mt-2">Created April 25, 2025</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="font-semibold mb-2">Next Invoice</h3>
              <p className="text-sm text-gray-600">#INV-2025 — $2,200</p>
              <p className="text-xs text-gray-400 mt-2">Due May 18, 2025</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="font-semibold mb-2">Project Status</h3>
              <p className="text-sm text-gray-600">Landscaping Phase 1</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full w-[65%]" />
              </div>
              <p className="text-xs text-gray-400 mt-2">65% complete</p>
            </div>
          </div>
        )}
        {activeTab === "quotes" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAdminData.quotes.map((quote) => (
                <div
                  key={quote.id}
                  id={`quote-${quote.id}`}
                  className="bg-white p-6 rounded shadow relative hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Quote #{quote.id} — {quote.customer}
                  </h3>
                  <p className="text-sm text-gray-600">Total: ${quote.total}</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside my-2">
                    {quote.items.map((item, i) => (
                      <li key={i}>
                        {item.description} — ${item.amount}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => exportPDF(`quote-${quote.id}`)}
                      className="text-blue-600 text-xs flex items-center gap-1"
                    >
                      <FaDownload /> PDF
                    </button>
                    <button
                      onClick={() => {
                        setPdfTargetId(quote.id);
                        setQuoteEmailModal(true);
                      }}
                      className="text-green-600 text-xs flex items-center gap-1"
                    >
                      <FaPaperPlane /> Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "invoices" && (
          <div className="space-y-4">
            {mockAdminData.invoices.map((inv) => (
              <div key={inv.id} className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold text-sm">Invoice #{inv.id}</h3>
                <p className="text-sm text-gray-600">
                  {inv.paid ? "Paid:" : "Amount Due:"} ${inv.amount}
                </p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    inv.paid
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {inv.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "tracker" && (
          <div className="space-y-4">
            {[
              "Site Inspection",
              "Material Delivery",
              "Construction",
              "Final Walkthrough",
              "Complete",
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    index < 3 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
                <p
                  className={`text-sm ${
                    index < 3 ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <span
                    className={`font-semibold ${
                      msg.sender === "You"
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {msg.sender}:
                  </span>{" "}
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border p-2 rounded text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}
        {activeTab === "account" && (
          <div className="bg-white p-6 rounded shadow max-w-2xl space-y-6">
            <h2 className="text-xl font-bold">Your Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value="John Doe"
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="text"
                  value="john@example.com"
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value="(555) 123-4567"
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Preferred Contact</label>
                <select className="w-full border p-2 rounded bg-white text-gray-700">
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Text Message</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Dark Mode</label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" disabled className="accent-blue-600" />
                <span className="text-sm text-gray-500">Coming Soon</span>
              </label>
            </div>
          </div>
        )}
        {quoteEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  `Quote #${pdfTargetId} sent to ${quoteEmailTarget} (simulated)`
                );
                setQuoteEmailModal(false);
                setQuoteEmailTarget("");
              }}
              className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg space-y-4"
            >
              <h2 className="text-xl font-bold">Send Quote via Email</h2>
              <input
                type="email"
                required
                placeholder="Client Email"
                value={quoteEmailTarget}
                onChange={(e) => setQuoteEmailTarget(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setQuoteEmailModal(false)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        {showToast && (
          <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg text-sm">
            Message sent!
          </div>
        )}
      </main>
    </div>
  );
}
