import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/crudpage.css";

const CRUDPage = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://kumbh-crup-backend.onrender.com/api/records";

  // Fetch records from MongoDB
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(API_URL);
        setRecords(response.data);
      } catch (error) {
        toast.error("Error fetching records.");
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new record
  const handleAddRecord = async () => {
    if (!formData.name || !formData.email) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(API_URL, formData);
      setRecords([...records, response.data]);
      setFormData({ name: "", email: "" });
      toast.success("Record added successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error adding record.");
      console.error("Error adding record:", error);
    }
  };

  // Edit an existing record
  const handleEditRecord = (record) => {
    setEditingId(record._id);
    setFormData({ name: record.name, email: record.email });
  };

  // Update a record
  const handleUpdateRecord = async () => {
    if (!formData.name || !formData.email) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${editingId}`, formData);
      setRecords(
        records.map((record) =>
          record._id === editingId ? response.data : record
        )
      );
      setEditingId(null);
      setFormData({ name: "", email: "" });
      toast.success("Record updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating record.");
      console.error("Error updating record:", error);
    }
  };

  // Delete a record
  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRecords(records.filter((record) => record._id !== id));
      toast.success("Record deleted successfully.");
    } catch (error) {
      toast.error("Error deleting record.");
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="crud-container">
      <ToastContainer /> {/* Toast container to display notifications */}
      <h1 className="crud-heading">Manage Records</h1>

      {/* Form Section */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {editingId ? (
          <button onClick={handleUpdateRecord} className="crud-button">
            Update Record
          </button>
        ) : (
          <button onClick={handleAddRecord} className="crud-button">
            Add Record
          </button>
        )}
      </div>

      {/* Records Section */}
      <div className="records-container">
        {records.length > 0 ? (
          <table className="records-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.name}</td>
                  <td>{record.email}</td>
                  <td>
                    <button
                      onClick={() => handleEditRecord(record)}
                      className="crud-action-button edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecord(record._id)}
                      className="crud-action-button delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default CRUDPage;
