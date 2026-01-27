// FilterPanel.js
import { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaSlidersH } from "react-icons/fa";

function FilterPanel({ onFilterChange, selectedCategory }) {
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const filterRef = useRef(null);
  const [openSection, setOpenSection] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    size: [],
    color: [],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    let url = "http://127.0.0.1:8000/api/filters/";
    if (selectedCategory?.type === "category") {
      url += `?category=${selectedCategory.slug}`;
    } else if (selectedCategory?.type === "subcategory") {
      url += `?subcategory=${selectedCategory.slug}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands || []);
        setSizes(data.sizes || []);
        setColors(data.colors || []);
      })
      .catch((err) => {
        console.error("Failed to load filters:", err);
      });
  }, [selectedCategory]);

  function toggleCheckbox(filterKey, value) {
    let updatedList;

    if (selectedFilters[filterKey].includes(value)) {
      updatedList = selectedFilters[filterKey].filter((v) => v !== value);
    } else {
      updatedList = [...selectedFilters[filterKey], value];
    }

    const updatedFilters = {
      ...selectedFilters,
      [filterKey]: updatedList,
    };

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }

  function toggleSection(name) {
    setOpenSection(openSection === name ? null : name);
  }

  return (
    <div style={styles.wrapper} ref={filterRef}>
      <button style={styles.filterButton} onClick={() => setOpen(!open)}>
        <FaSlidersH size={18} />
        <span style={{ marginLeft: 8 }}>Filter</span>
      </button>

      {open && (
        <div style={styles.dropdown}>
          <div style={styles.panel}>

            {/* FIXED TOP ROW */}
            <div style={styles.topRow}>
              <h3 style={styles.heading}>Filters</h3>

              <p
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontWeight: 500,
                  margin: 0,
                }}
                onClick={() => {
                  const cleared = { brand: [], size: [], color: [] };
                  setSelectedFilters(cleared);
                  onFilterChange(cleared);
                }}
              >
                Clear All Filters
              </p>
            </div>

            {/* BRAND */}
            <div>
              <div
                style={styles.sectionHeader}
                onClick={() => toggleSection("brand")}
              >
                <span>Brands</span>
                {openSection === "brand" ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {openSection === "brand" && (
                <div style={styles.sectionBody}>
                  {brands.length === 0 ? (
                    <div style={styles.empty}>No brands available</div>
                  ) : (
                    brands.map((b) => (
                      <label key={b.id ?? b.name} style={styles.option}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.brand.includes(b.name)}
                          onChange={() => toggleCheckbox("brand", b.name)}
                        />
                        <span style={{ marginLeft: 8 }}>{b.name}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* SIZE */}
            <div>
              <div
                style={styles.sectionHeader}
                onClick={() => toggleSection("size")}
              >
                <span>Sizes</span>
                {openSection === "size" ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {openSection === "size" && (
                <div style={styles.sectionBody}>
                  {sizes.length === 0 ? (
                    <div style={styles.empty}>No sizes available</div>
                  ) : (
                    sizes.map((s) => (
                      <label key={s.id ?? s.name} style={styles.option}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.size.includes(s.name)}
                          onChange={() => toggleCheckbox("size", s.name)}
                        />
                        <span style={{ marginLeft: 8 }}>{s.name}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* COLOR */}
            <div>
              <div
                style={styles.sectionHeader}
                onClick={() => toggleSection("color")}
              >
                <span>Colors</span>
                {openSection === "color" ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {openSection === "color" && (
                <div style={styles.sectionBody}>
                  {colors.length === 0 ? (
                    <div style={styles.empty}>No colors available</div>
                  ) : (
                    colors.map((c) => (
                      <label key={c.id ?? c.name} style={styles.option}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.color.includes(c.name)}
                          onChange={() => toggleCheckbox("color", c.name)}
                        />
                        <span style={{ marginLeft: 8 }}>{c.name}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
    margin: "20px",
  },

  filterButton: {
    display: "flex",
    alignItems: "center",
    background: "#111",
    color: "white",
    border: "none",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
  },

  dropdown: {
    position: "absolute",
    top: "52px",
    left: 0,
    width: "320px",
    zIndex: 40,
  },

  panel: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
    border: "1px solid rgba(0,0,0,0.06)",
  },

  heading: {
    fontSize: "16px",
    margin: 0,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    fontWeight: 600,
  },

  sectionBody: {
    padding: "8px 0 10px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  option: {
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  empty: {
    color: "#888",
    fontSize: "13px",
    padding: "6px 0",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
};

export default FilterPanel;
