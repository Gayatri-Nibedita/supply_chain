import React from "react";
import "../styles/forms.css";

const FormLayout = ({ title, description, children }) => {
  return (
    <div className="form-layout">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">{title}</h1>
          <p className="form-description">{description}</p>
        </div>
        <div className="form-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;