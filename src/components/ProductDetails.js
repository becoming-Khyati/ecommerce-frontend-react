import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useState } from "react";

function ProductDetails() {
    const location = useLocation();
    const product = location.state;
    const [qty, setQty] = useState(1);
    const { addItem } = useContext(CartContext);

    if(!product) {
        return (
            <p>No Product Details Found</p>
        );
    }


    return (
        <div style={styles.container}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.infoBox}>
                <h2>{product.name}</h2>
                <p style={styles.price}>₹{product.price}</p>
                <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
                    {product.description}
                </p>

                <button
                    onClick={() => addItem({...product, quantity: qty})}
                    style={styles.cartBtn}
                    >
                        🛒 Add to Cart
                    </button>

                <Link to="/products" style={{ textDecoration: "none" }}>
                    <button style={styles.backBtn}>⬅️Back</button>
                </Link>
            </div>
        </div>
    );
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    gap: "50px",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  
  image: {
    width: "420px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  infoBox: {
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  backBtn: {
    marginTop: "20px",
    background: "black",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
    ":hover": {
      opacity: 0.8,
    }
  },

  cartBtn: {
  marginTop: "20px",
  background: "black",
  color: "white",
  padding: "14px 24px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
}

};

export default ProductDetails;