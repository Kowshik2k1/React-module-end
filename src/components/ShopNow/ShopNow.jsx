import React, { useEffect, useState } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import Filter from "components/Filter/Filter";

function ShopNow() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFiltered(data.products);
        const unique = [...new Set(data.products.map((p) => p.category))];
        setCategories(unique);
      });
  }, []);

    useEffect(() => {
    if (selectedCategory) {
      setFiltered(products.filter((p) => p.category === selectedCategory));
    } else {
      setFiltered(products);
    }
  }, [selectedCategory, products]);

  return (
    <div className="site-container my-4">
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {filtered.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ShopNow;
