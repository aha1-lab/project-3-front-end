import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import {
  Navbar as NavbarBS,
  Nav,
  Container,
  Button,
  NavDropdown,
  Form,
} from "react-bootstrap";

import SearchInput from "./SearchInput";
import CartIcon from "./CartIcon";

function Navbar({ toggleTheme, darkMode }) {
  const { user, logout } = useContext(authContext);

  return (
    <NavbarBS sticky="top" className={"shadow-lg mb-3"}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          {!user && (
            <>
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
              <Nav.Link to="/signup" as={NavLink}>
                Sign Up
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <NavDropdown title={`Sitting (${user.username})`}>
                <NavDropdown.Item as={Link} to={`persons/${user._id}`}>
                  User Details
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`persons/edit/${user._id}`}>
                  Edit User Details
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/person/address"}>
                  Address
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/person/addAddress"}>
                  Add Address
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/orderSammary"}>
                  Orders Summary
                </NavDropdown.Item>
                {user.mode === "seller" && (
                  <NavDropdown.Item as={NavLink} to={"/products/new"}>
                    Add product
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </>
          )}
        </Nav>
        <SearchInput />
        <Nav.Link to="/cart" as={NavLink} className="pe-2">
          <CartIcon />
        </Nav.Link>
        <Form>
          <Form.Check type="switch" id="custom-switch" onClick={toggleTheme} />
        </Form>
        {user && (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </Container>
    </NavbarBS>
  );
}

export default Navbar;
