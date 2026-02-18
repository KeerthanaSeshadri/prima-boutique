import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ShoppingBag, Camera, Sparkles } from "lucide-react";

const ProductCard = ({ product, onTryOn }) => {
    const { addToCart } = useContext(CartContext);
    const isOutOfStock = product.stock === 0;
    const hasAR = product.arType && product.arType !== "None";

    return (
        <div className="product-card group">
            <div className="product-image-container">
                {product.image ? (
                    <img
                        src={`http://localhost:4000/uploads/${product.image}`}
                        alt={product.name}
                        className="product-image"
                    />
                ) : (
                    <div className="placeholder-image">No Image</div>
                )}

                {/* Badges */}
                <div className="product-badges">
                    {hasAR && (
                        <span className="badge badge-ar" title="AR Try-On Available">
                            <Sparkles size={12} /> AR
                        </span>
                    )}
                    {product.salePrice && (
                        <span className="badge badge-sale">Sale</span>
                    )}
                    {isOutOfStock && (
                        <span className="badge badge-out">Sold Out</span>
                    )}
                </div>

                {/* Overlay Actions */}
                <div className="product-actions">
                {/* Try On Button - Only show if AR is available */}
                {hasAR && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTryOn(product);
                    }}
                    className="btn-icon-action btn-ar"
                    title={`Live Try-On (${product.arType})`}
                  >
                    <Camera size={20} />
                  </button>
                )}


                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isOutOfStock) addToCart(product);
                        }}
                        disabled={isOutOfStock}
                        className="btn-icon-action"
                        title="Add to Cart"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </div>

            <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-title">{product.name}</h3>

                <div className="product-price">
                    {product.salePrice ? (
                        <>
                            <span className="price-sale">₹{product.salePrice}</span>
                            <span className="price-old">₹{product.price}</span>
                        </>
                    ) : (
                        <span className="price-regular">₹{product.price}</span>
                    )}
                </div>
            </div>

            <style jsx>{`
        .product-card {
          background: white;
          border-radius: var(--radius-card);
          overflow: hidden;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-premium);
        }

        .product-image-container {
          position: relative;
          aspect-ratio: 1; /* Square images */
          overflow: hidden;
          background-color: var(--bg-muted);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05); /* Zoom effect */
        }

        .product-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: var(--radius-badge);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-sale {
          background-color: var(--danger);
          color: white;
        }

        .badge-out {
          background-color: var(--dark-light);
          color: white;
        }

        .badge-ar {
          background: linear-gradient(135deg, var(--primary), #d98aa1);
          color: white;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          animation: pulse-ar 2s ease-in-out infinite;
        }

        @keyframes pulse-ar {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .product-actions {
          position: absolute;
          bottom: 15px;
          right: 15px;
          display: flex;
          gap: 10px;
          opacity: 0;
          transform: translateY(10px);
          transition: all var(--transition-normal);
        }

        .product-card:hover .product-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-icon-action {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--dark);
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-fast);
        }

        .btn-icon-action:hover {
          background-color: var(--primary);
          color: white;
        }

        .btn-ar {
          background: linear-gradient(135deg, var(--primary), #d98aa1) !important;
          color: white !important;
        }

        .btn-ar:hover {
          background: linear-gradient(135deg, #d98aa1, var(--primary)) !important;
          box-shadow: var(--shadow-lg);
        }

        .product-info {
          padding: 15px;
        }

        .product-category {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .product-title {
          font-size: 1rem;
          font-weight: 500;
          color: var(--dark);
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .price-regular, .price-sale {
          font-weight: 600;
          color: var(--dark);
        }

        .price-sale {
          color: var(--danger);
        }

        .price-old {
          text-decoration: line-through;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
