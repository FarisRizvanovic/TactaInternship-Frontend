import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddModal = ({ onAdd, title, setModalVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const addClicked = () => {
    onAdd(name);
    closeModal();
  };

  return (
    <div
      className={`fixed z-50 pb-[15vh] inset-0 bg-black bg-opacity-50 backdrop-blur-none flex justify-center items-center transition-opacity ${
        isOpen
          ? "opacity-100 transition duration-200"
          : "opacity-0 pointer-events-none transition duration-200"
      }`}
    >
      <div className="w-[500px]">
        <div className=" bg-white px-10 py-5 rounded-xl">
          {/* Headline */}
          <div className="mt-2 flex justify-between">
            <h2 className="text-2xl ">{title}</h2>
            <AiOutlineClose
              onClick={() => closeModal()}
              className="flex items-center justify-center w-9 h-9 focus:ring-0 cursor-pointer p-2 hover:bg-gray-200 rounded-full"
            />
          </div>
          {/* Body */}
          <div className="flex flex-col gap-2 mt-2">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border-2 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Name..."
              name="nameInput"
              id="nameInput"
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <button
              onClick={() => closeModal()}
              className={`w-full bg-red-500 text-white rounded-md py-4 px-4 duration-100 focus:outline-none hover:bg-red-600`}
            >
              Cancel
            </button>

            <button
              onClick={() => addClicked()}
              className={`w-full bg-green-500 text-white rounded-md py-4 px-4 duration-100 focus:outline-none hover:bg-green-600`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
