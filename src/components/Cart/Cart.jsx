import React, { useContext } from "react";
import { CartContext } from "context/CartContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQty, clearCart } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="site-container my-4">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.title}</strong>
                  <img src={item.images} alt="imag" width="54" />
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.qty}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
          <div className="d-flex gap-3">
            <Button variant="outline-danger" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link to="/checkout">
              <Button variant="success">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
