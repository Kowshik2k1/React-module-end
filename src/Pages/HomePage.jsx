import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  // To do search if we enter search text in input field and to close the hamburger menu in mobile
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="home-wrap site-container">
      <div className="banner">
        <img
          src="/desktop-banner.png"
          className="img-responsive d-none d-lg-block"
          alt="KMart Banner"
        />
        <img
          src="/mobile-banner.png"
          className="img-responsive d-block d-lg-none"
          alt="KMart Banner"
        />
        <div className="banner-txt">
          <p className="para">Shop Smart. Live Well.</p>
        </div>
        <div className="banner-btn" id="shop-now">
          <Link to="/shop">Shop Now</Link>
        </div>
      </div>
      <div className="categories pt-5 py-3 px-4">
        <h2 className="py-3">Categories currently available to search: </h2>
        <ul className="categ-list">
          <li>Beauty</li>
          <li>Fragnance</li>
          <li>Groceries</li>
          <li>Furniture</li>
        </ul>
      </div>
      <div className="search-wrap" id="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            id="search-input"
            placeholder="Search here..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-item"
          />
        </form>
      </div>
    </div>
  );
}

export default HomePage;
