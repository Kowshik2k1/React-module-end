import React, { useState, useContext } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "context/CartContext";
import Login from "components/Login/Login";
import Signup from "components/Signup/Signup";
import { isAuthenticated, logout, getUserName } from "utils/auth";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClick = () => {
    setShow(!show);
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-wrap site-container">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" width="100" alt="KMart Logo" title="KMart Logo" />
        </Link>
      </div>

      <div className="mobile-menu-wrap">
        <div className="mobile-menu d-lg-none" onClick={handleClick}>
          {isOpen ? (
            <img src="/close-icon.png" alt="Close menu" width={50} height={50} />
          ) : (
            <img src="/hamburger-open.svg" alt="Open menu" width={50} height={50} />
          )}
        </div>

        {/* Mobile menu */}
        {show && (
          <div className="mobile-menu-content">
            <div className="menu">
              <ul>
                <li>
                  <Link to="/shop" onClick={handleClick}>Shop now</Link>
                </li>
                <li>
                  <Link to="/search" onClick={handleClick}>Search</Link>
                </li>
                <li>
                  <Link to="/checkout" onClick={handleClick}>Checkout</Link>
                </li>
              </ul>

              {!isLoggedIn && (
                <>
                  <div className="login">
                    <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
                  </div>
                  <div className="login">
                    <button className="btn" onClick={() => setShowSignup(true)}>Sign up</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop menu */}
      <div className="menu d-none align-items-center d-lg-flex">
        <ul>
          <li>
            <Link to="/shop">Shop now</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <>
            <span style={{ marginRight: 10 }}>Welcome, {getUserName()}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <div className="login d-none d-lg-block">
              <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
            </div>
            <div className="login d-none d-lg-block">
              <button className="btn" onClick={() => setShowSignup(true)}>Sign up</button>
            </div>
          </>
        )}
      </div>

      <div className="cart-icon d-none d-lg-block mx-3">
        <Link to="/cart" className="position-relative text-dark">
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Signup show={showSignup} onHide={() => setShowSignup(false)} />
    </div>
  );
}

export default Header;
