import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ categories = [], onCategorySelect }) {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleCategoryClick = (cat) => {
    onCategorySelect(cat);
    navigate("/products")
  }
  const access = localStorage.getItem("access");

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${query}`);
    setQuery("");
  };

  return (
    <>
      {/* TOP NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: "#111",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        {/* Hamburger Icon */}
        <div
          style={{ fontSize: "28px", cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          ☰
        </div>

        {/* Logo */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
        {/* <img src="./images/logo.png" alt="logo" /> */}
        Fashion Studio 🛍️
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/products" style={styles.navLink}>
            Products
          </Link>
          <Link to="/about" style={styles.navLink}>
            About
          </Link>
          <Link to="/contact" style={styles.navLink}>
            Contact
          </Link>


          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              style={styles.searchInput}
            />
          </form>
        </div>

        {/* Account / Login / Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {access ? (
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={styles.logoutButton}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={styles.loginButton}>
              Login
            </Link>
          )}

          <Link to="/cart" style={styles.cartLink}>
            Cart: {cart.length}
          </Link>
        </div>
      </div>

      {/* SIDEBAR MENU */}
      {open && <div style={styles.overlay}></div>}
      <div
        ref={sidebarRef}
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-100%",
          width: "260px",
          height: "100%",
          background: "#111",
          color: "white",
          padding: "20px",
          transition: "all 0.3s ease",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <div
          style={{ fontSize: "26px", cursor: "pointer", marginBottom: "20px" }}
          onClick={() => setOpen(false)}
        >
          ✖
        </div>

        <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Categories</h3>

        <div
          style={styles.cat}
          onClick={() => {
            onCategorySelect({ type: "all", slug: "" });
            navigate("/products");
            setOpen(false);
          }}
        >
          All Products
        </div>

        {categories.map((cat) => (
          <div key={cat.slug}>
            {/* Category */}
            <div
              style={{
                ...styles.cat,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.2s",
              }}
              onClick={() => {
                if (cat.subcategories?.length > 0) {
                  setExpandedCategory(
                    expandedCategory === cat.slug ? null : cat.slug
                  );
                } else {
                  onCategorySelect({ type: "category", slug: cat.slug });
                  setOpen(false);
                }
              }}
            >
              <li onClick={() => handleCategoryClick ({ type: "category", slug: cat.slug })}>
              {cat.name}{" "}
              </li>
              {cat.subcategories?.length > 0 ? (
                <span>{expandedCategory === cat.slug ? "▲" : "▼"}</span>
              ) : null}
            </div>

            {/* Subcategories */}
            {expandedCategory === cat.slug &&
              cat.subcategories?.map((sub) => (
                <div
                  key={sub.slug}
                  style={styles.subcat}
                  onClick={() => {
                    onCategorySelect({ type: "subcategory", slug: sub.slug });
                    setOpen(false);
                  }}
                >
                  ➤ {sub.name}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  cat: {
    padding: "10px 0",
    borderBottom: "1px solid #444",
    cursor: "pointer",
    fontWeight: 500,
  },
  subcat: {
    padding: "8px 0 8px 20px",
    borderBottom: "1px solid #333",
    cursor: "pointer",
    fontSize: "14px",
    color: "#ccc",
    transition: "color 0.2s",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  searchInput: {
    padding: "6px 10px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    width: "180px",
  },
  logoutButton: {
    background: "none",
    border: "1px solid white",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.2s",
  },
  loginButton: {
    background: "#00aaff",
    border: "none",
    color: "white",
    padding: "6px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.2s",
  },
  cartLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
};

export default Navbar;
