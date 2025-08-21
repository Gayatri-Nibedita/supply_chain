import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const features = [
    {
      icon: "📦",
      title: "Product Registration",
      description: "Register new products with complete origin and certification details",
      link: "/add-product"
    },
    {
      icon: "🔄",
      title: "Ownership Transfer",
      description: "Securely transfer product ownership with blockchain verification",
      link: "/transfer-ownership"
    },
    {
      icon: "🏆",
      title: "Certification Management",
      description: "Add and manage product certifications and quality standards",
      link: "/add-certification"
    },
    {
      icon: "🔍",
      title: "Product Tracking",
      description: "View complete product details and ownership history",
      link: "/view-product"
    },
    {
      icon: "📊",
      title: "History Tracking",
      description: "Track the complete journey of products through the supply chain",
      link: "/view-history"
    },
    {
      icon: "✅",
      title: "Ownership Verification",
      description: "Verify product ownership with cryptographic proof",
      link: "/verify-ownership"
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Blockchain-Powered
            <span className="highlight"> Supply Chain</span>
          </h1>
          <p className="hero-description">
            Ensure transparency, traceability, and trust in your supply chain with 
            immutable blockchain records. Track products from origin to destination 
            with complete verification.
          </p>
          <div className="hero-actions">
            <Link to="/add-product" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/view-product" className="cta-button secondary">
              Track Product
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blockchain-visual">
            <div className="block">🔗</div>
            <div className="block">📦</div>
            <div className="block">🚚</div>
            <div className="block">🏪</div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Blockchain?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>🔒 Immutable Records</h3>
              <p>Once recorded, data cannot be altered, ensuring complete integrity</p>
            </div>
            <div className="benefit-item">
              <h3>🌐 Decentralized Trust</h3>
              <p>No single point of failure, distributed verification across the network</p>
            </div>
            <div className="benefit-item">
              <h3>👁️ Full Transparency</h3>
              <p>Complete visibility into product journey and ownership history</p>
            </div>
            <div className="benefit-item">
              <h3>⚡ Real-time Tracking</h3>
              <p>Instant updates and verification of product status and location</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;