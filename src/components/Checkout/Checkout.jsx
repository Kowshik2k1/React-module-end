import React, { useContext } from "react";
import { CartContext } from "context/CartContext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate("/thankyou");
    clearCart();
  };

  return (
    <div className="site-container my-4">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

      <Form onSubmit={handleCheckout}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" required placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={3} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select required>
            <option value="">Select</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;
