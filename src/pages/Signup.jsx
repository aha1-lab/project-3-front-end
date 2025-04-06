import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    userType: "seller",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSignUp = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/sign-up`,
        formData
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username" className=" mt-3">
          Username
        </Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="row">
        <div className="col">
          <Form.Group>
            <Form.Label htmlFor="password" className=" mt-3">
              Password
            </Form.Label>
            <Form.Control
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Label htmlFor="confirmPassword" className=" mt-3">
              Confirm Password
            </Form.Label>
            <Form.Control
              className="form-control"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
      </div>

      <Form.Group>
        <Form.Label className="mt-3" htmlFor="email">
          Email
        </Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="userType" className=" mt-3">
          userType
        </Form.Label>
        <select
          className="form-control"
          name="userType"
          id="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
      </Form.Group>
      <Button className="mt-3"variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
}

export default Signup;
