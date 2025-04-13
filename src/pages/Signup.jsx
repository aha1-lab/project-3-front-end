import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";

function Signup() {
  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    mode: "buyer",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/sign-up`,
        formData
      );
      navigator("/login");
    } catch (err) {
      console.log(err);
    }
  }
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
            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstName" className=" mt-3">
                First Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="lastName" className=" mt-3">
                Last Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email" className=" mt-3">
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className=" mt-3">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="mode" className=" mt-3">
            Mode
          </Form.Label>
          <select
            name="mode"
            id="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>

            <option value="seller">Seller</option>
          </select>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
  );
}

export default Signup;
