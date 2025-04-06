import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { authContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { validateToken } = useContext(authContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/sign-in`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      const userInfo = {
        username: response.data.user.username,
        userType: response.data.user.userType,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      validateToken();
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Log in</button>
      </form>
    </div>
  );
}

export default Login;
