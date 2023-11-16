import React, { useState } from "react";
import ShopperCard from "../components/ShopperCard";

const Home = () => {
  const [shoppers, setShoppers] = useState([
    { _id: 1, name: "John", items: [] },
    { _id: 2, name: "Faris", items: [] },
  ]);

  const [items, setItems] = useState([
    "Apple Juice",
    "Milk",
    "Bread",
    "Apple",
    "Egg",
  ]);

  const [zoneOne, setZoneOne] = useState([""]);
  const [zoneTwo, setZoneTwo] = useState([""]);

  const handleOnDrag = (e, newItem) => {
    e.dataTransfer.setData("newItem", newItem);
  };

  const handleOnDrop = (e, shopperId) => {
    const newItem = e.dataTransfer.getData("newItem");

    setShoppers((prevShoppers) =>
      prevShoppers.map((shopper) =>
        shopper._id === shopperId
          ? { ...shopper, items: [...shopper.items, newItem] }
          : shopper
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen">
      <div>
        {/* USERS */}
        <div className="bg-red-50 h-[25vh] py-5 px-10">
          <h2 className="text-xl font-bold text-center">Users</h2>
          <div className=""></div>
        </div>
        <div className="flex h-[75vh]">
          {/* SHOPPERS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-blue-50">
            <h2 className="text-xl font-bold text-center">Shoppers</h2>
            <div className="grid grid-cols-2 gap-5">
              {shoppers.map((user) => (
                <div
                  key={user._id}
                  className="w-fit h-fit"
                  onDrop={(e) => handleOnDrop(e, user._id)}
                  onDragOver={(e) => handleDragOver(e)}
                >
                  <ShopperCard name={user.name} items={user.items} />
                </div>
              ))}
            </div>
          </div>

          {/* ITEMS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-green-50">
            <h2 className="text-xl font-bold text-center">Items</h2>
            <div className="grid grid-flow-col-dense gap-5">
              {items.map((item) => (
                <div
                  onDragStart={(e) => handleOnDrag(e, item)}
                  draggable
                  className="p-4 border-2 w-fit h-fit bg-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// return (
//   <div className="">
//     <div className=" flex gap-10 h-fit mt-40 justify-center ">
//       <div
//         draggable
//         onDragStart={(e) => handleOnDrag(e, "PRVI DIV")}
//         className="flex w-fit p-4 border-2 bg-blue-400 text-white"
//       >
//         PRVI DIV
//       </div>
//       <div
//         draggable={true}
//         onDragStart={(e) => handleOnDrag(e, "DRUGI DIV")}
//         className="flex w-fit p-4 border-2 bg-blue-400 text-white"
//       >
//         DRUGI DIV
//       </div>

//       <div
//         onDrop={(e) => handleOnDrop(e, "ZONE_ONE")}
//         onDragOver={(e) => handleDragOver(e)}
//         className="p-4 justify-center items-center border-2 w-fit"
//       >
//         ZONE ONE
//       </div>

//       <div
//         onDrop={(e) => handleOnDrop(e, "ZONE_TWO")}
//         onDragOver={(e) => handleDragOver(e)}
//         className="p-4 justify-center items-center border-2 w-fit"
//       >
//         ZONE ONE
//       </div>
//     </div>
//     <div className="flex justify-center gap-16 mt-5">
//       <div className="border-2 p-4">
//         <h2 className="font-bold">Zone 1</h2>
//         {zoneOne.map((item) => (
//           <p>{item}</p>
//         ))}
//       </div>
//       <div className="border-2 p-4">
//         <h2 className="font-bold">Zone 2</h2>
//         {zoneTwo.map((item) => (
//           <p>{item}</p>
//         ))}
//       </div>
//     </div>
//   </div>
// );
