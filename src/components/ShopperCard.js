import React from "react";

const ShopperCard = ({ name, items }) => {
  return (
    <div className="bg-white border-2 py-2 px-6 rounded w-72">
      {/* NAME */}
      <h2 className="font-bold text-md text-center">
        {name ? name : "Not found"}
      </h2>

      {/* ITEMS */}
      <h2 className="font-semibold">Items:</h2>
      <div className="">
        {items && items.length > 0 ? (
          items.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p className="text-gray-400">Drag & drop to add a new item</p>
        )}
      </div>
    </div>
  );
};

export default ShopperCard;
