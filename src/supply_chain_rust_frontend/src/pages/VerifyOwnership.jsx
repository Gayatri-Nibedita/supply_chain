import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const VerifyOwnership = () => {
  const [formData, setFormData] = useState({
    productId: "",
    owner: ""
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setVerificationResult(null);

    try {
      const result = await supplyChainActor.verify_ownership(
        formData.productId,
        formData.owner
      );

      if (result.Ok !== undefined) {
        setVerificationResult(result.Ok);
        setMessage({ 
          type: "success", 
          text: "Verification completed successfully!" 
        });
      } else {
        setMessage({ type: "error", text: result.Err || "Verification failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Verify Ownership"
      description="Verify if a specific principal owns a particular product."
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="productId" className="form-label">Product ID *</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter product ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="owner" className="form-label">Owner Principal *</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter principal ID to verify"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Verifying..." : "Verify Ownership"}
        </button>
      </form>

      {verificationResult !== null && (
        <div className="verification-result">
          <div className={`result-card ${verificationResult ? 'verified' : 'not-verified'}`}>
            <div className="result-icon">
              {verificationResult ? '✅' : '❌'}
            </div>
            <div className="result-content">
              <h3 className="result-title">
                {verificationResult ? 'Ownership Verified' : 'Ownership Not Verified'}
              </h3>
              <p className="result-description">
                {verificationResult 
                  ? 'The specified principal is confirmed as the current owner of this product.'
                  : 'The specified principal is not the current owner of this product.'
                }
              </p>
              <div className="result-details">
                <div className="detail-row">
                  <span className="detail-label">Product ID:</span>
                  <span className="detail-value">{formData.productId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Principal:</span>
                  <span className="detail-value">{formData.owner}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FormLayout>
  );
};

export default VerifyOwnership;