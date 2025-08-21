import React, { useState } from "react";
import supplyChainActor from "../utils/icp";
import FormLayout from "../components/FormLayout";
import "../styles/forms.css";

const ViewHistory = () => {
  const [productId, setProductId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setHistory([]);

    try {
      const result = await supplyChainActor.get_product_history(productId);

      if (result.Ok) {
        setHistory(result.Ok);
        setMessage({ 
          type: "success", 
          text: `Found ${result.Ok.length} transaction(s)` 
        });
      } else {
        setMessage({ type: "error", text: result.Err || "No history found" });
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
      title="View Product History"
      description="Track the complete ownership and transaction history of any product."
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
            placeholder="Enter product ID to view history"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Loading History..." : "View History"}
        </button>
      </form>

      {history.length > 0 && (
        <div className="history-results">
          <h3 className="results-title">Transaction History</h3>
          <div className="history-timeline">
            {history.map((transaction, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-number">{history.length - index}</span>
                </div>
                <div className="timeline-content">
                  <div className="transaction-header">
                    <span className="transaction-type">
                      {transaction.from === "Genesis" ? "Product Created" : "Ownership Transfer"}
                    </span>
                    <span className="transaction-time">
                      {formatTimestamp(transaction.timestamp)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-flow">
                      <span className="flow-from">
                        <strong>From:</strong> {transaction.from}
                      </span>
                      <span className="flow-arrow">→</span>
                      <span className="flow-to">
                        <strong>To:</strong> {transaction.to}
                      </span>
                    </div>
                    {transaction.metadata && transaction.metadata[0] && (
                      <div className="transaction-metadata">
                        <strong>Notes:</strong> {transaction.metadata[0]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </FormLayout>
  );
};

export default ViewHistory;