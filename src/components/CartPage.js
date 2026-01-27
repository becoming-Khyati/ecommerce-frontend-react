import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div style={styles.container}>

      <h2>Your Cart</h2>

      <div style={styles.layout}>
        {/* LEFT SIDE — CART ITEMS */}
        <div style={styles.left}>
          {cart.length === 0 ? (
            <p>Your cart is empty 🛍️</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={styles.card}>
                <img src={item.image} alt={item.name} style={styles.image} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div style={styles.qtyRow}>
                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                  </div>

                  <p>Total: ₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        {cart.length > 0 && (
          <div style={styles.summaryBox}>
            <h3>Order Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Total Price: ₹{totalPrice}
            </p>

            <button style={styles.checkoutBtn}>
              Proceed to Checkout
            </button>

            <button style={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* BACK BUTTON */}
      <Link to="/products" style={{ textDecoration: "none" }}>
        <button style={styles.backBtn}>
          ⬅️ Back to Products
        </button>
      </Link>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  // ⭐ THE FIX — 2 COLUMN LAYOUT ⭐
  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    alignItems: "start",
    marginTop: "20px",
  },

  left: {
    width: "100%",
  },

  card: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
  },

  image: {
    width: "90px",
    height: "120px",
    borderRadius: "8px",
    marginRight: "20px",
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },

  qty: {
    fontWeight: "bold",
  },

  summaryBox: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#f9f9f9",
    width: "100%",
  },

  checkoutBtn: {
    marginTop: "10px",
    padding: "12px 18px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },

  backBtn: {
    marginTop: "30px",
    padding: "10px 18px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer",
  },

  totalPrice: {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "10px",
},

clearBtn: {
  marginTop: "10px",
  padding: "12px 18px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
},
};

export default CartPage;
