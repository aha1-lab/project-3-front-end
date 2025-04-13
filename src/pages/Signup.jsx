import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        formData
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="userType">userType:</label>
        <select
          name="userType"
          id="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="saler">Saler</option>
          <option value="buyer">Buyer</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Signup;
