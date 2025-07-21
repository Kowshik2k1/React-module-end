import React, { useContext, useState } from "react";
import { CartContext } from "context/CartContext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "utils/auth";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://jwt-assignment1.onrender.com/api/add-to-cart",
        {
          ...formData,
          cartItems,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      clearCart();
      navigate("/thankyou");
    } catch (err) {
      alert("Access Denied or Error: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="site-container my-4">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

      <Form onSubmit={handleCheckout}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
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
