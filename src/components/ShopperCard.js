import React from "react";

const ShopperCard = ({ name, items, onDelete, shopperId }) => {
  return (
    <div className="bg-white border-2 py-2 px-6 rounded w-72">
      {/* NAME */}
      <h2 className="font-bold text-md text-center">
        {name ? name : "Not found"}
      </h2>

      {/* ITEMS */}
      <h2 className="font-semibold">Items:</h2>
      <div className="ml-1 flex flex-col gap-1">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <span className="bg-black w-1.5 h-1.5 rounded-full" />
              <div className="flex justify-between w-full">
                <p>{item.name}</p>
                <button
                  onClick={() => onDelete(item._id, shopperId)}
                  className="text-sm text-red-500 hover:text-red-300"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Drag & drop to add a new item</p>
        )}
      </div>
    </div>
  );
};

export default ShopperCard;
