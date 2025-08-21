import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const ProductsByOwner = () => {
  const [owner, setOwner] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setProducts([]);

    try {
      const result = await supplyChainActor.get_products_by_owner(owner);
      
      setProducts(result);
      setMessage({ 
        type: "success", 
        text: `Found ${result.length} product(s)` 
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Products by Owner"
      description="View all products owned by a specific principal."
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="owner" className="form-label">Owner Principal *</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="form-input"
            placeholder="Enter principal ID"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Searching..." : "Find Products"}
        </button>
      </form>

      {products.length > 0 && (
        <div className="products-results">
          <h3 className="results-title">Owned Products</h3>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-header">
                  <h4 className="product-name">{product.name}</h4>
                  <span className="product-id">ID: {product.id}</span>
                </div>
                
                <div className="product-details">
                  <div className="detail-row">
                    <span className="detail-label">Origin:</span>
                    <span className="detail-value">{product.origin}</span>
                  </div>
                  
                  {product.description && product.description[0] && (
                    <div className="detail-row">
                      <span className="detail-label">Description:</span>
                      <span className="detail-value">{product.description[0]}</span>
                    </div>
                  )}
                  
                  <div className="detail-row">
                    <span className="detail-label">Certifications:</span>
                    <div className="certifications-list">
                      {product.certifications.length > 0 ? (
                        product.certifications.map((cert, certIndex) => (
                          <span key={certIndex} className="certification-tag">
                            {cert}
                          </span>
                        ))
                      ) : (
                        <span className="no-certifications">None</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Transactions:</span>
                    <span className="detail-value">{product.history.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && message.type === "success" && (
        <div className="no-products">
          <div className="no-products-icon">📦</div>
          <h3>No Products Found</h3>
          <p>This principal doesn't own any products yet.</p>
        </div>
      )}
    </FormLayout>
  );
};

export default ProductsByOwner;