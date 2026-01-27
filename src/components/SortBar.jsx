import { useState, useRef, useEffect } from "react";
import { MdSort } from "react-icons/md";

function SortBar({ onSortChange }) {
    const [open, setOpen] = useState(false);
    const sortbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortbarRef.current && !sortbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

    return (
        <div style={styles.container} ref={sortbarRef}>
            {/*Sort Button*/}
            <button style={styles.sortButton} onClick={() => setOpen(!open)}>
                <MdSort size={22} />
                <span style={{ margin: "8px" }}>Sort</span>
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div style={styles.dropdown}>
                    <div
                        style={styles.option}
                        onClick={() => {
                            onSortChange("price_asc");
                            setOpen(false);
                        }}
                        >
                            Price: Low ➡️ High 
                            </div>
                    
                    <div 
                        style={styles.option}
                        onClick={() => {
                            onSortChange("price_dsc");
                            setOpen(false);
                        }}>
                            Price: High ➡️ Low
                    </div>                        
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        position: "relative",
        display: "inline-block",
        margin: "20px",
    },
   
    sortButton: {
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
        top: "50px",
        left: 0,
        width: "180px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        zIndex: 20,
        overflow: "hidden",
    },

    option: {
        padding: "12px 14px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
        fontSize: "14px",
    },
};

export default SortBar;
