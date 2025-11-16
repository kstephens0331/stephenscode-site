import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserFriends, FaBoxOpen, FaFileInvoice, FaBell,
  FaShoppingCart, FaUsers, FaPlus, FaTrash, FaEdit
} from "react-icons/fa";

export default function AdminPortalDemo() {
  const [activeTab, setActiveTab] = useState("customers");

  const [customers, setCustomers] = useState([
    { id: "C001", name: "Jane Doe", email: "jane@example.com", phone: "555-1234", address: "123 Main St" },
    { id: "C002", name: "John Smith", email: "john@company.com", phone: "555-5678", address: "456 Oak Ave" },
  ]);

  const [products, setProducts] = useState([
    { sku: "SKU100", name: "Smart Sensor", price: "199.99" },
    { sku: "SKU101", name: "Wireless Gateway", price: "299.99" },
  ]);

  const [orders, setOrders] = useState([
    { id: "ORD001", customer: "Jane Doe", status: "Shipped" },
    { id: "ORD002", customer: "John Smith", status: "Pending" },
  ]);

  const [invoices, setInvoices] = useState([
    { id: "INV001", amount: 250.0, due: "2025-06-01", paid: false },
    { id: "INV002", amount: 150.0, due: "2025-06-15", paid: true },
  ]);

  const [notifications, setNotifications] = useState([
    { message: "New order placed by Jane Doe." },
    { message: "Invoice INV002 has been paid." },
  ]);

  const [team, setTeam] = useState([
    { name: "Kyle Stephens", role: "Admin" },
    { name: "Sarah Lee", role: "Editor" },
  ]);

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "", phone: "", email: "", address: "",
  });
  const [newProduct, setNewProduct] = useState({
    sku: "", name: "", price: "",
  });
  const [newOrder, setNewOrder] = useState({
    id: "", customer: "", status: "",
  });
  const [newInvoice, setNewInvoice] = useState({
    id: "", amount: "", due: "", paid: false,
  });
  const [newTeam, setNewTeam] = useState({
    name: "", role: "",
  });
  const [newNotification, setNewNotification] = useState({
    message: "",
  });
  // Utility table renderer
  const renderTable = (headers, rows) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 text-sm">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>{headers.map((h, i) => (<th key={i} className="px-4 py-2 text-left">{h}</th>))}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );

  // Customers
  const renderCustomers = () => (
    <div>
      {renderTable(
        ["ID", "Name", "Email", "Phone", "Address", "Actions"],
        customers.map((c, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{c.id}</td>
            <td className="px-4 py-2">{c.name}</td>
            <td className="px-4 py-2">{c.email}</td>
            <td className="px-4 py-2">{c.phone}</td>
            <td className="px-4 py-2">{c.address}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const name = prompt("Update Name:", c.name);
                const email = prompt("Update Email:", c.email);
                const phone = prompt("Update Phone:", c.phone);
                const address = prompt("Update Address:", c.address);
                if (name && email && phone && address) {
                  const updated = [...customers];
                  updated[i] = { ...c, name, email, phone, address };
                  setCustomers(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...customers];
                updated.splice(i, 1);
                setCustomers(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowCustomerModal(true)} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Customer</button>
    </div>
  );

  // Products
  const renderProducts = () => (
    <div>
      {renderTable(
        ["SKU", "Name", "Price", "Actions"],
        products.map((p, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{p.sku}</td>
            <td className="px-4 py-2">{p.name}</td>
            <td className="px-4 py-2">{p.price}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const name = prompt("Update Name:", p.name);
                const price = prompt("Update Price:", p.price);
                if (name && price) {
                  const updated = [...products];
                  updated[i] = { ...p, name, price };
                  setProducts(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...products];
                updated.splice(i, 1);
                setProducts(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowProductModal(true)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Product</button>
    </div>
  );
  // Orders
  const renderOrders = () => (
    <div>
      {renderTable(
        ["Order ID", "Customer", "Status", "Actions"],
        orders.map((o, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{o.id}</td>
            <td className="px-4 py-2">{o.customer}</td>
            <td className="px-4 py-2">{o.status}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const customer = prompt("Update Customer:", o.customer);
                const status = prompt("Update Status:", o.status);
                if (customer && status) {
                  const updated = [...orders];
                  updated[i] = { ...o, customer, status };
                  setOrders(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...orders];
                updated.splice(i, 1);
                setOrders(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowOrderModal(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Order</button>
    </div>
  );

  // Invoices
  const renderInvoices = () => (
    <div>
      {renderTable(
        ["Invoice ID", "Amount", "Due Date", "Paid", "Actions"],
        invoices.map((inv, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{inv.id}</td>
            <td className="px-4 py-2">{inv.amount}</td>
            <td className="px-4 py-2">{inv.due}</td>
            <td className="px-4 py-2">{inv.paid ? "Yes" : "No"}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const amount = prompt("Update Amount:", inv.amount);
                const due = prompt("Update Due Date:", inv.due);
                const paid = confirm("Mark as Paid?") ? true : false;
                if (amount && due) {
                  const updated = [...invoices];
                  updated[i] = { ...inv, amount, due, paid };
                  setInvoices(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...invoices];
                updated.splice(i, 1);
                setInvoices(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowInvoiceModal(true)} className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Invoice</button>
    </div>
  );
  // Team
  const renderTeam = () => (
    <div>
      {renderTable(
        ["Name", "Role", "Actions"],
        team.map((t, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{t.name}</td>
            <td className="px-4 py-2">{t.role}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const name = prompt("Update Name:", t.name);
                const role = prompt("Update Role:", t.role);
                if (name && role) {
                  const updated = [...team];
                  updated[i] = { ...t, name, role };
                  setTeam(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...team];
                updated.splice(i, 1);
                setTeam(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowTeamModal(true)} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Team Member</button>
    </div>
  );

  // Notifications
  const renderNotifications = () => (
    <div>
      {renderTable(
        ["Message", "Actions"],
        notifications.map((n, i) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="px-4 py-2">{n.message}</td>
            <td className="px-4 py-2 space-x-2">
              <button onClick={() => {
                const message = prompt("Update Message:", n.message);
                if (message) {
                  const updated = [...notifications];
                  updated[i] = { message };
                  setNotifications(updated);
                }
              }} className="text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
              <button onClick={() => {
                const updated = [...notifications];
                updated.splice(i, 1);
                setNotifications(updated);
              }} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </td>
          </tr>
        ))
      )}
      <button onClick={() => setShowNotificationModal(true)} className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"><FaPlus /> Add Notification</button>
    </div>
  );
  return (
    <div className="flex h-screen bg-[#0e0e0e] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] p-4 pt-16 space-y-2 fixed h-screen">
        {[
          ["customers", FaUserFriends, "Customers"],
          ["products", FaBoxOpen, "Products"],
          ["orders", FaShoppingCart, "Orders"],
          ["invoices", FaFileInvoice, "Invoices"],
          ["team", FaUsers, "Team"],
          ["notifications", FaBell, "Notifications"],
        ].map(([tab, Icon, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${activeTab === tab ? "bg-gray-700" : ""}`}>
            <Icon /> {label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pt-16 ml-64">
        <motion.h1 className="text-3xl font-bold text-orange-400 mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          {activeTab === "customers" && renderCustomers()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "invoices" && renderInvoices()}
          {activeTab === "team" && renderTeam()}
          {activeTab === "notifications" && renderNotifications()}
        </motion.div>
      </main>

      {/* Modals */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Customer Modal */}
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <div className="space-y-2">
              <input type="text" placeholder="Full Name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Phone" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" placeholder="Address" value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} className="w-full border p-2 rounded" />
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={() => setShowCustomerModal(false)} className="text-sm text-blue-600 hover:underline">Cancel</button>
              <button onClick={() => {
                const id = `C${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
                if (newCustomer.name && newCustomer.phone && newCustomer.email && newCustomer.address) {
                  setCustomers([...customers, { id, ...newCustomer }]);
                  setNewCustomer({ name: "", phone: "", email: "", address: "" });
                  setShowCustomerModal(false);
                } else {
                  alert("Please fill in all fields.");
                }
              }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Repeat similarly for showProductModal, showOrderModal, showInvoiceModal, showTeamModal, showNotificationModal */}
    </div>
  );
}
