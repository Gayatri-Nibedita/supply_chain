import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const AddCertification = () => {
  const [formData, setFormData] = useState({
    productId: "",
    certification: ""
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
      const result = await supplyChainActor.add_certification(
        formData.productId,
        formData.certification
      );

      if (result.Ok !== undefined) {
        setMessage({ type: "success", text: "Certification added successfully!" });
        setFormData({
          productId: "",
          certification: ""
        });
      } else {
        setMessage({ type: "error", text: result.Err || "Failed to add certification" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Add Certification"
      description="Add quality certifications and standards to existing products."
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
          <label htmlFor="certification" className="form-label">Certification *</label>
          <input
            type="text"
            id="certification"
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter certification (e.g., ISO9001, Organic, Fair Trade)"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Adding Certification..." : "Add Certification"}
        </button>
      </form>
    </FormLayout>
  );
};

export default AddCertification;