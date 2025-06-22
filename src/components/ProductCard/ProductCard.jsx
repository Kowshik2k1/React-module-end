import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import './styles.scss';
import { CartContext } from "context/CartContext";

export default function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, updateQty } = useContext(CartContext);

  const inCart = cartItems.find(item => item.id === product.id);

  const handleIncrement = () => {
    updateQty(product.id, inCart.qty + 1);
  };

  const handleDecrement = () => {
    if (inCart.qty === 1) {
      removeFromCart(product.id); // Removes item when qty reaches 0
    } else {
      updateQty(product.id, inCart.qty - 1);
    }
  };

  return (
    <div>
      <Card className="h-100 radius-3" style={{ width: '21rem' }}>
        <Card.Img className="border-bottom" variant="top" src={product.images} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>

          <div className="add-cart">
            {inCart ? (
              <div className="btn-wrap">
                <button className="dec" onClick={handleDecrement}>-</button>
                <span>{inCart.qty}</span>
                <button className="inc" onClick={handleIncrement}>+</button>
              </div>
            ) : (
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
