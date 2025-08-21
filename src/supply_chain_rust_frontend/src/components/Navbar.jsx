import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import "../styles/navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();
      
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const principalId = identity.getPrincipal().toText();
        setIsAuthenticated(true);
        setPrincipal(principalId);
        return;
      }

      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principalId = identity.getPrincipal().toText();
          setIsAuthenticated(true);
          setPrincipal(principalId);
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal("");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/add-product", label: "Add Product" },
    { path: "/transfer-ownership", label: "Transfer" },
    { path: "/add-certification", label: "Certify" },
    { path: "/view-product", label: "View Product" },
    { path: "/view-history", label: "History" },
    { path: "/verify-ownership", label: "Verify" },
    { path: "/products-by-owner", label: "My Products" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🔗</span>
          SupplyChain
        </Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="auth-info">
              <span className="principal-id">
                {principal.slice(0, 8)}...{principal.slice(-4)}
              </span>
              <button onClick={handleLogout} className="auth-button logout">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="auth-button login">
              Connect Wallet
            </button>
          )}
        </div>

        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;