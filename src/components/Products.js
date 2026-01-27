import React, { useState, useEffect } from "react";
import axios from "axios";
import SortBar from "./SortBar";
import FilterPanel from "./FilterPanel";
import ProductCard from "./ProductCard";

const Products = ({ selectedCategory }) => {

  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("");

  // Fetch products whenever category OR filters OR sorting changes
  useEffect(() => {
    let query = [];

    // Category from App.js
    if (selectedCategory?.type === "category") {
      query.push(`category=${selectedCategory.slug}`);
    }
    if (selectedCategory?.type === "subcategory") {
      query.push(`subcategory=${selectedCategory.slug}`);
    }

    // Filters
    if (filters.brand) query.push(`brand=${filters.brand}`);
    if (filters.size) query.push(`size=${filters.size}`);
    if (filters.color) query.push(`color=${filters.color}`);

    // Sorting
    if (sortOption) query.push(`sort=${sortOption}`);

    let url = "http://127.0.0.1:8000/api/products/";
    if (query.length > 0) url += "?" + query.join("&");

    console.log("FETCH URL:", url);

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [selectedCategory, filters, sortOption]);

  return (
    <div>
      <SortBar onSortChange={(value) => setSortOption(value)} />

      <FilterPanel onFilterChange={(f) => setFilters(f)} selectedCategory={selectedCategory} />

      {/* PRODUCT GRID */}
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={`http://127.0.0.1:8000${product.image}`}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
    padding: "20px",
  },
};

export default Products;
