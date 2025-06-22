import React, { useContext, useEffect } from "react";
import { CartContext } from "context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      clearCart();
    }, 500);
  }, [clearCart]);

  return (
    <div className="site-container my-5 text-center">
      <h2>Thank You for Your Purchase! 🎉</h2>
      <p>Your order has been placed successfully.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CheckoutPage;
