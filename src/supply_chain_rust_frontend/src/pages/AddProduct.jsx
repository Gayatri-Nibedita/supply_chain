import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    origin: "",
    description: "",
    certifications: ""
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
      const certArray = formData.certifications
        .split(",")
        .map(cert => cert.trim())
        .filter(cert => cert.length > 0);

      const result = await supplyChainActor.add_product(
        formData.id,
        formData.name,
        formData.origin,
        certArray,
        formData.description ? [formData.description] : []
      );

      if (result.Ok !== undefined) {
        setMessage({ type: "success", text: "Product added successfully!" });
        setFormData({
          id: "",
          name: "",
          origin: "",
          description: "",
          certifications: ""
        });
      } else {
        setMessage({ type: "error", text: result.Err || "Failed to add product" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Add New Product"
      description="Register a new product in the supply chain with complete details and certifications."
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="id" className="form-label">Product ID *</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter unique product ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="origin" className="form-label">Origin *</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter product origin"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter product description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="certifications" className="form-label">Certifications</label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter certifications (comma-separated)"
          />
          <small className="form-help">Separate multiple certifications with commas</small>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </FormLayout>
  );
};

export default AddProduct;