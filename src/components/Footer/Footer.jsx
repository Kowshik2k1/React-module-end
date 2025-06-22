import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-wrap bg-black">
      <p className="copy-text">© 2025 KMart, Inc. All rights reserved</p>
      <div className="quick-links border-bottom pb-3 mx-3">
        <ul className="footer-list site-container">
          <li>
            <Link to="/shop">Shop Now</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      <ul className="footer-list mt-2 pt-3 site-container">
        <li>Guides</li>
        <li>Terms of Sale</li>
        <li>Terms of Use</li>
        <li>KMart Privacy Policy</li>
      </ul>
    </div>
  );
}

export default Footer;
