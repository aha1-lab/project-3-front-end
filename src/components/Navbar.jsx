import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import {
  Navbar as NavbarBS,
  Nav,
  Container,
  Button,
  NavDropdown,
} from "react-bootstrap";

import SearchInput from "./SearchInput";
import CartIcon from "./CartIcon";

function Navbar({ toggleTheme, darkMode }) {
  const { user, logout } = useContext(authContext);

  return (
    <NavbarBS
      sticky="top"
      className={"shadow-lg mb-3"}>
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
                <NavDropdown.Item as={Link} to={"/orders"}>
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
          <SearchInput/>  
        {/* <Nav.Link to="/cart" as={NavLink}>
          <CartIcon />
        </Nav.Link> */}
        <Button variant="warning" onClick={toggleTheme}>
          {darkMode ? (
            <i className="bi bi-toggle-on" />
          ) : (
            <i className="bi bi-toggle-off" />
          )}
        </Button>
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
