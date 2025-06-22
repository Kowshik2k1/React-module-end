import React, { useState, useContext, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "context/CartContext";
import { useLocation } from "react-router-dom";
import Login from "components/Login/Login";
import Signup from "components/Signup/Signup";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isHome, setIsHome] = useState();
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const location = useLocation();

  // To toggle the hamburger menu in mobile
  const handleClick = () => {
    setShow(!show);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location.pathname]);

  return (
    <div className="header-wrap site-container">
      <div className="logo">
        <Link to="/">
          <img
            src="/logo.png"
            width="100"
            alt="KMart Logo"
            title="KMart Logo"
          />
        </Link>
      </div>
      <div className="mobile-menu-wrap">
        <div className="mobile-menu d-lg-none" onClick={handleClick}>
          {isOpen ? (
            <img src="/close-icon.png" alt="Close" width={50} height={50} />
          ) : (
            <img
              src="/hamburger-open.svg"
              alt="Hamburger"
              width={50}
              height={50}
            />
          )}
        </div>
        {/* Mobile menu */}
        {show && (
          <div className="mobile-menu-content">
            <div className="menu">
              <ul>
                {isHome && (
                  <>
                    <li>
                      <a href="#shop-now" onClick={handleClick}>
                        Shop now
                      </a>
                    </li>
                    <li>
                      <a href="#search" onClick={handleClick}>
                        Search
                      </a>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/checkout" onClick={handleClick}>
                    Checkout
                  </Link>
                </li>
              </ul>
              <div className="login">
                <button className="btn" onClick={() => setShowLogin(true)}>
                  Login
                </button>
                <Login show={showLogin} onHide={() => setShowLogin(false)} />
              </div>
              <div className="login">
                <button className="btn" onClick={() => setShowSignup(true)}>
                  Sign up
                </button>
                <Signup show={showSignup} onHide={() => setShowSignup(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="menu d-none align-items-center d-lg-flex">
        <ul>
          {isHome && (
            <>
              <li>
                <a href="#shop-now">Shop now</a>
              </li>
              <li>
                <a href="#search">Search</a>
              </li>
            </>
          )}
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
        <div className="login d-none d-lg-block">
          <button className="btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <Login show={showLogin} onHide={() => setShowLogin(false)} />
        </div>
        <div className="login d-none d-lg-block">
          <button className="btn" onClick={() => setShowSignup(true)}>
            Sign up
          </button>
          <Signup show={showSignup} onHide={() => setShowSignup(false)} />
        </div>
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
    </div>
  );
}

export default Header;
