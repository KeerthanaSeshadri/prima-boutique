import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import LiveTryOn from "./LiveTryOn";
import ProductCard from "../../components/customer/ProductCard";
import Loader from "../../components/common/Loader";
import HeroSection from "../../components/customer/HeroSection";
import FeaturesSection from "../../components/customer/FeaturesSection";
import { Filter } from "lucide-react";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (category = "All") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/products?category=${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch Products Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="products-page">
        <HeroSection />
        <FeaturesSection />

        {/* Header */}
        <div className="section-header flex-between mb-md">
          <h2 className="section-title">Latest Collections</h2>

          <div className="filter-wrapper flex-center">
            <Filter size={18} style={{ marginRight: "8px", color: "var(--text-muted)" }} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex-center" style={{ minHeight: "400px" }}>
            <Loader text="Curating collection..." size={50} />
          </div>
        ) : (
          <div className="grid grid-products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onTryOn={setSelectedProduct}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found in this category</h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Try-On Modal */}
      {selectedProduct && (
        <LiveTryOn
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct} // Pass product if needed later
        />
      )}

      <style jsx>{`
        .section-header {
           margin-bottom: var(--spacing-lg);
           flex-wrap: wrap;
           gap: 20px;
        }

        .section-title {
            font-size: 2rem;
            margin: 0;
        }
        
        .category-select {
            padding: 10px 16px;
            border-radius: var(--radius-btn);
            border: 1px solid var(--border);
            background-color: var(--bg-surface);
            font-family: var(--font-body);
            color: var(--text-main);
            min-width: 200px;
            cursor: pointer;
        }

        .grid-products {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
        }

        .skeleton-card {
            height: 350px;
            background-color: #e0e0e0;
            border-radius: var(--radius-card);
            animation: pulse 1.5s infinite;
        }

        .no-products {
            width: 100%;
            text-align: center;
            padding: 50px;
            grid-column: 1 / -1;
            color: var(--text-muted);
        }

        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
};

export default Products;
