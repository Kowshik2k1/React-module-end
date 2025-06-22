import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "components/ProductCard/ProductCard";

function Search() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const searchInput = new URLSearchParams(location.search);
  const query = searchInput.get("query") || "";

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLocaleLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [products, query]);

  return (
    <div>
      <div
        className="d-flex my-5 flex-wrap gap-3 justify-content-center site-container"
        id="products"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
}

export default Search;
