import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";


const Cart = () => {

  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    const price = item.salePrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <>


      <div style={{ padding: "40px" }}>
        <h2>Your Cart</h2>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map(item => (
          <div
            key={item._id}
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              alignItems: "center"
            }}
          >
            <img
              src={`http://localhost:4000/uploads/${item.image}`}
              alt={item.name}
              width="120"
              style={{ borderRadius: "6px" }}
            />

            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>₹{item.salePrice || item.price}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => decreaseQty(item._id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => {
                    if (item.quantity < item.stock) {
                      increaseQty(item._id);
                    } else {
                      console.log("Stock limit reached");
                      alert("Cannot add more than available stock");
                    }
                  }}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h3>Total: ₹{total}</h3>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
