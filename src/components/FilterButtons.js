import React from "react";

const FilterButtons = ({ onFilter, resetFilter }) => {
  const categories = ["sneakers", "casual", "formal", "children"];

  return (
    <div className="buttons text-center py-5">
      <button className="btn btn-outline-dark btn-sm m-2" onClick={resetFilter}>
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => onFilter(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;