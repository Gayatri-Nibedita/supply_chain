import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const TransferOwnership = () => {
  const [formData, setFormData] = useState({
    productId: "",
    newOwner: "",
    metadata: ""
  });
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

    try {
      const result = await supplyChainActor.transfer_ownership(
        formData.productId,
        formData.newOwner,
        formData.metadata ? [formData.metadata] : []
      );

      if (result.Ok !== undefined) {
        setMessage({ type: "success", text: "Ownership transferred successfully!" });
        setFormData({
          productId: "",
          newOwner: "",
          metadata: ""
        });
      } else {
        setMessage({ type: "error", text: result.Err || "Failed to transfer ownership" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Transfer Ownership"
      description="Transfer product ownership to another party with blockchain verification."
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
          <label htmlFor="newOwner" className="form-label">New Owner Principal *</label>
          <input
            type="text"
            id="newOwner"
            name="newOwner"
            value={formData.newOwner}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter new owner's principal ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="metadata" className="form-label">Transfer Notes</label>
          <textarea
            id="metadata"
            name="metadata"
            value={formData.metadata}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Add notes about this transfer (optional)"
            rows="3"
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Transferring..." : "Transfer Ownership"}
        </button>
      </form>
    </FormLayout>
  );
};

export default TransferOwnership;