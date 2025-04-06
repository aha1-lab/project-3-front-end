import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import PersonForm from "./pages/PersonForm";
import AddressForm from "./pages/AddressForm";
import Sidebar from "./components/Sidebar";
import ProductDisplay from "./pages/products/ProductDisplay";
import ProductDetails from "./pages/products/ProductDetails";
import ProductForm from "./pages/products/ProductForm";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Cart from "./pages/Cart";


function App() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Container className="py-4">
        <div className="container-fluid">
          <Navbar toggleTheme={toggleTheme} darkMode={darkMode}/>
          <div className="row">
            <div className="col-auto col-sm-2 p-0">
              {/* <Sidebar /> */}
            </div>
            <div className="col">
              <main className="p-3">
                
                <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/person/new" element={<PersonForm />} />
                  <Route path="/person/address" element={<AddressForm />} />
                  <Route path="/" element={<ProductDisplay />} />
                  <Route path="/products/new/" element={<ProductForm />} />
                  <Route path="/products/update/:itemId" element={<ProductForm />} />
                  <Route path="/products/:itemId" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
