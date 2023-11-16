import React from "react";

const ItemCard = ({ item, active = true }) => {
  return (
    <div
      className={`p-4 border-2 w-fit h-fit duration-100 ${
        !active ? "bg-red-500 text-white" : "bg-white"
      }`}
    >
      {item}
    </div>
  );
};

export default ItemCard;
