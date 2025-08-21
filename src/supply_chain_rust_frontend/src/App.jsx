import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import TransferOwnership from "./pages/TransferOwnership";
import AddCertification from "./pages/AddCertification";
import ViewProduct from "./pages/ViewProduct";
import ViewHistory from "./pages/ViewHistory";
import VerifyOwnership from "./pages/VerifyOwnership";
import ProductsByOwner from "./pages/ProductsByOwner";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/transfer-ownership" element={<TransferOwnership />} />
            <Route path="/add-certification" element={<AddCertification />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/view-history" element={<ViewHistory />} />
            <Route path="/verify-ownership" element={<VerifyOwnership />} />
            <Route path="/products-by-owner" element={<ProductsByOwner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;