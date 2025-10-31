import React, { useState, useEffect } from "react";
import { addPostAPI, updatePostAPI } from "../services/AllAPI";
import { useLocation, useNavigate } from "react-router-dom";

function AddPost({ onPostAdded }) {
  const location = useLocation();
  const navigate = useNavigate();
  const editPost = location.state?.post;

  const [form, setForm] = useState({
    content: "",
    image: "",
    date: "",
    platform: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (editPost) {
      setForm({
        content: editPost.content || "",
        image: editPost.image || "",
        date: editPost.date || "",
        platform: editPost.platform || "",
      });
      setEditIndex(editPost.id);
    }
  }, [editPost]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.content || !form.date || !form.platform) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editIndex != null) {
        const response = await updatePostAPI(editIndex, form);
        console.log(response);
        alert("Post updated successfully");
        navigate("/");
      } else {
        const response = await addPostAPI(form);
        console.log(response);
        alert("Post added successfully");
      }

      if (onPostAdded) onPostAdded();

      setForm({ content: "", image: "", date: "", platform: "" });
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    }
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    marginBottom: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: '1px solid #000',
    background: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };

  const cancelButtonStyle = {
    padding: '8px 16px',
    border: '1px solid #ddd',
    background: '#fff',
    color: '#000',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '24px',
          color: '#000'
        }}>
          {editIndex ? "Edit Post" : "New Post"}
        </h2>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Post content"
          style={{
            ...inputStyle,
            minHeight: '100px',
            resize: 'vertical'
          }}
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          style={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="platform"
          value={form.platform}
          onChange={handleChange}
          style={{
            ...inputStyle,
            marginBottom: '20px'
          }}
        >
          <option value="">Select platform</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
        </select>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.background = '#333'}
            onMouseOut={(e) => e.target.style.background = '#000'}
          >
            {editIndex ? "Update" : "Save"}
          </button>

          {editIndex && (
            <button
              type="button"
              onClick={() => navigate("/")}
              style={cancelButtonStyle}
              onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
              onMouseOut={(e) => e.target.style.background = '#fff'}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddPost;