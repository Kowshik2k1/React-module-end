import React from "react";

function Filter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-3 px-3">
      <label htmlFor="category-select">Filter by Category:</label>
      <select
        id="category-select"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
