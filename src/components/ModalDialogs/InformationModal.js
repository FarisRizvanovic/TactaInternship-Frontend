import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const InformationModal = ({ setModalVisible }) => {
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

  return (
    <div
      className={`fixed z-50 pb-[15vh] inset-0 bg-black bg-opacity-50 backdrop-blur-none flex justify-center items-center transition-opacity ${
        isOpen
          ? "opacity-100 transition duration-200"
          : "opacity-0 pointer-events-none transition duration-200"
      }`}
    >
      <div className="w-[75vw]">
        <div className=" bg-white px-10 py-5 rounded-xl">
          {/* Headline */}
          <div className="mt-2 flex justify-between">
            <h2 className="text-2xl ">Just A Quick Guide On Using The App</h2>
            <AiOutlineClose
              onClick={() => closeModal()}
              className="flex items-center justify-center w-9 h-9 focus:ring-0 cursor-pointer p-2 hover:bg-gray-200 rounded-full"
            />
          </div>
          {/* Body */}
          <div className="flex flex-col gap-2 mt-2">
            <li>
              *If there are no user add one yourself by clicking the add button
            </li>
            <li>
              Click on a user to see the list of shoppers assigned to that along
              with their items, and the items users have added
            </li>
            <li>
              *If there are no shoppers add one yourself by clicking the add
              button
            </li>
            <li>
              *If there are no items add one yourself by clicking the add button
            </li>
            <li>
              Drag an item onto a shopper to add it to a shopper's list of items
            </li>
            <li>
              To remove a item from a shopper list click the delete next to the
              item on the shopper
            </li>
            <li>
              To remove a user, item or a shopper click the little delete button
              on their corners
            </li>
            <li>
              If an item is red that means it has been added 3 times {`(limit)`}
            </li>

            <div>
              <h2 className="font-bold">*Known buggs</h2>
              <p>
                When deleting a shopper that has items, for example an apple and
                the apple has already been added 3 times{" "}
                {`(Either all 3 times on the same shopper or spread around other shoppers)`}{" "}
                meaning it's red, it won't change color but you will still be
                able to add it as you should, but the color won't change
                immediately after the shopper is deleted. Reason for this are
                the pre methods on the schema on the backend.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-5">
            <button
              onClick={() => closeModal()}
              className={`w-full bg-red-500 text-white rounded-md py-4 px-4 duration-100 focus:outline-none hover:bg-red-600`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
