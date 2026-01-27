import React from 'react';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>

        {/* LEFT TEXT CONTENT ------------------------------------------------*/}
        <div style={styles.textBox}>
          <p style={styles.tagline}>Welcome to</p>

          <h1 style={styles.heading}>Fashion Studio</h1>

          <p style={styles.subheading}>
            Your Next Move in Fashion.
          </p>

          <NavLink to="/products">
            <button style={styles.btn}>Shop Now</button>
          </NavLink>
        </div>

        {/* RIGHT IMAGE ------------------------------------------------------*/}
        <div style={styles.imageBox}>
          <figure style={styles.figure}>
            <img 
              src="images/blush-pink.jpg" 
              alt="hero" 
              style={styles.image} 
            />
          </figure>
        </div>

      </div>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "140rem",
    margin: "0 auto",
    padding: "4rem 2rem",
  },

  grid: {
    display: "grid",
    gap: "6rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    alignItems: "center",
  },

  textBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1.8rem",
  },

  tagline: {
    fontSize: "1.6rem",
    color: "#555",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  heading: {
    fontSize: "4.8rem",
    fontWeight: "700",
    lineHeight: "1.1",
  },

  subheading: {
    fontSize: "1.8rem",
    color: "#444",
    maxWidth: "40rem",
    lineHeight: "1.6",
  },

  btn: {
    backgroundColor: "black",
    color: "white",
    padding: "1.4rem 2.8rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.6rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "fit-content",
    transition: "all 0.3s ease",
  },

  imageBox: {
    display: "flex",
    justifyContent: "center",
  },

  figure: {
    width: "100%",
    margin: 0,
  },

  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  }
};

export default HeroSection;
