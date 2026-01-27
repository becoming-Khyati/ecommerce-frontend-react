import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ name, price, image, description }) {
  const { addItem } = useContext(CartContext);
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover ? "0 10px 25px rgba(0,0,0,0.12)" : "0 6px 18px rgba(0,0,0,0.08)"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
  to={`/product/${name}`}
  state={{ name, price, image, description }}
  style={{ textDecoration: "none", color: "inherit" }}
>
  <div style={styles.imageWrapper}>
      <img src={image} alt={name} style={{...styles.image, transform: hover ? "scale(1.05)" : "scale(1)"}} />
      </div>
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.price}>₹{price}</p>
      </Link>
      <button style={styles.button} onClick={() => addItem({ name, price, image })}>
        Add To Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    width: "100%",       // makes it fit its parent grid column
    maxWidth: "200px",   // limits size for desktop
    margin: "auto"
  },
  imageWrapper: {
    overflow: "hidden",
    height: "210px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease"
  },
  title: {
    fontSize: "14px",
    fontWeight: 500,
    margin: "8px 0 4px 0",
    lineHeight: "1.2em"
  },
  price: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111",
    marginBottom: "8px"
  },
  button: {
    width: "90%",
    margin: "0 auto 10px auto",
    padding: "8px 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#111",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease"
  }
};

export default ProductCard;