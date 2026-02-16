import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import LiveTryOn from "./LiveTryOn";

const categories = [
  "All",
  "Imitation Jewellery",
  "Bridal Jewellery for Rent",
  "Bridal Bangles",
  "Fancy Products",
  "Toys",
  "Gifts",
  "Hair Accessories",
  "Impon Jewellery",
  "Golden Covering Jewellery"
];

const Products = () => {

  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (category = "All") => {
    try {
      console.log("Fetching products...");
      console.log("Selected Category:", category);

      const res = await axios.get(
        `http://localhost:4000/api/products?category=${category}`
      );

      console.log("Products Received:", res.data);
      setProducts(res.data);

    } catch (error) {
      console.log("Fetch Products Error:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div style={styles.container}>
        <h2>Our Products</h2>

        {/* Category Filter */}
        <div style={styles.filterContainer}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.dropdown}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div style={styles.grid}>
          {products.map((product) => {

            console.log("Product Category:", product.category);

            return (
              <div key={product._id} style={styles.card}>

                {product.image && (
                  <img
                    src={`http://localhost:4000/uploads/${product.image}`}
                    alt={product.name}
                    style={styles.image}
                  />
                )}

                <h3>{product.name}</h3>
                <p style={styles.category}>{product.category}</p>

                {/* Price Section */}
                {product.salePrice ? (
                  <div>
                    <span style={styles.oldPrice}>
                      ₹{product.price}
                    </span>
                    <span style={styles.salePrice}>
                      ₹{product.salePrice}
                    </span>
                  </div>
                ) : (
                  <p style={styles.price}>₹{product.price}</p>
                )}

                {/* Stock */}
                <p style={styles.stock}>
                  {product.stock > 0
                    ? `In Stock: ${product.stock}`
                    : "Out of Stock"}
                </p>

                {/* Add To Cart */}
                <button
                  onClick={() => {
                    console.log("Add To Cart Clicked:", product.name);
                    addToCart(product);
                  }}
                  disabled={product.stock === 0}
                  style={styles.cartButton}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
                </button>

                {/* 🔥 LIVE TRY ON BUTTON (Bridal Only) */}
                {product.category &&
                  product.category.toLowerCase().includes("bridal") && (
                    <button
                      style={styles.tryOnButton}
                      onClick={() => {
                        console.log("Opening Live Try On for:", product.name);
                        setSelectedProduct(product);
                      }}
                    >
                      Live Try On
                    </button>
                  )}

              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 LIVE TRY ON MODAL */}
      {selectedProduct && (
        <LiveTryOn
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

const styles = {
  container: {
    padding: "40px",
  },
  filterContainer: {
    marginBottom: "20px",
  },
  dropdown: {
    padding: "8px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px"
  },
  category: {
    color: "gray",
    fontSize: "14px"
  },
  price: {
    fontWeight: "bold",
    fontSize: "18px"
  },
  oldPrice: {
    textDecoration: "line-through",
    marginRight: "10px",
    color: "gray"
  },
  salePrice: {
    color: "red",
    fontWeight: "bold",
    fontSize: "18px"
  },
  stock: {
    marginTop: "10px",
    fontSize: "14px"
  },
  cartButton: {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
    borderRadius: "6px"
  },
  tryOnButton: {
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#B76E79",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
    borderRadius: "6px"
  }
};

export default Products;
