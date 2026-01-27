import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import AuthPage from "./components/Login";
import Contact from "./components/Contact";
import About from "./components/About";
import Products from "./components/Products";
import ErrorPage from "./components/ErrorPage";
import { useState, useEffect } from "react";
import Home from "./components/Home";

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    type: "all",
    slug: "",
  });

  // Fetch categories ONCE for the whole app
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        categories={categories}
        onCategorySelect={(obj) => setSelectedCategory(obj)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:name" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        
        {/* Pass selectedCategory to Products */}
        <Route 
          path="/products" 
          element={<Products selectedCategory={selectedCategory} />} 
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
