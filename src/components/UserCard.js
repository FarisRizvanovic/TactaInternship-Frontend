import React from "react";

const UserCard = ({ name, selected = false }) => {
  return (
    <div
      className={`bg-white cursor-pointer hover:border-blue-400 border-2 duration-100 rounded w-fit h-fit p-7 flex flex-col justify-center items-center 
      ${selected && "border-blue-400"}`}
    >
      <h2 className="font-bold text-xl">User</h2>
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default UserCard;
