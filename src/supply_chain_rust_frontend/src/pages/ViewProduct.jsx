import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const ViewProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setProduct(null);

    try {
      const result = await supplyChainActor.get_product(productId);

      if (result.Ok) {
        setProduct(result.Ok);
        setMessage({ type: "success", text: "Product found!" });
      } else {
        setMessage({ type: "error", text: result.Err || "Product not found" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString();
  };

  return (
    <FormLayout
      title="View Product Details"
      description="Search for and view complete product information and history."
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="productId" className="form-label">Product ID *</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="form-input"
            placeholder="Enter product ID to search"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Searching..." : "Search Product"}
        </button>
      </form>

      {product && (
        <div className="product-details">
          <h3 className="details-title">Product Information</h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Product ID:</span>
              <span className="detail-value">{product.id}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{product.name}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Origin:</span>
              <span className="detail-value">{product.origin}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Current Owner:</span>
              <span className="detail-value">{product.current_owner}</span>
            </div>
            
            {product.description && product.description[0] && (
              <div className="detail-item full-width">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{product.description[0]}</span>
              </div>
            )}
            
            <div className="detail-item full-width">
              <span className="detail-label">Certifications:</span>
              <div className="certifications">
                {product.certifications.length > 0 ? (
                  product.certifications.map((cert, index) => (
                    <span key={index} className="certification-badge">
                      {cert}
                    </span>
                  ))
                ) : (
                  <span className="detail-value">No certifications</span>
                )}
              </div>
            </div>
          </div>

          {product.history && product.history.length > 0 && (
            <div className="history-section">
              <h4 className="history-title">Ownership History</h4>
              <div className="history-timeline">
                {product.history.map((transaction, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="transaction-info">
                        <span className="transaction-from">From: {transaction.from}</span>
                        <span className="transaction-to">To: {transaction.to}</span>
                        <span className="transaction-time">
                          {formatTimestamp(transaction.timestamp)}
                        </span>
                      </div>
                      {transaction.metadata && transaction.metadata[0] && (
                        <div className="transaction-metadata">
                          {transaction.metadata[0]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </FormLayout>
  );
};

export default ViewProduct;