import React, { useEffect, useState } from "react";
import ShopperCard from "../components/ShopperCard";
import useUsers from "../utils/useUsers";
import UserCard from "../components/UserCard";
import {
  addShopper,
  deleteShopper,
  getShoppersWithItemsForUser,
} from "../api/Shoppers";
import {
  addItem,
  addShopperToItem,
  deleteItem,
  deleteShopperFromItem,
  getItemsForUser,
} from "../api/Items";
import ItemCard from "../components/ItemCard";
import toast from "react-hot-toast";
import AddModal from "../components/ModalDialogs/AddModal";
import { addUser, deleteUser } from "../api/Users";
import { MdDeleteOutline } from "react-icons/md";

const Home = () => {
  const { users, refreshUsersData } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentShoppers, setCurrentShoppers] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);

  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [addShopperModalVisible, setAddShopperModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const getShoppers = async () => {
    try {
      console.log(selectedUser._id);
      const res = await getShoppersWithItemsForUser(selectedUser._id);
      setCurrentShoppers(res.data.data.shoppers);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getItems = async () => {
    try {
      const res = await getItemsForUser(selectedUser._id);
      setCurrentItems(res.data.data.items);
      // console.log(res.data.data.items);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getShoppers();
      getItems();
    }
  }, [selectedUser]);

  const handleOnDrag = (e, itemId) => {
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleOnDrop = (e, shopperId) => {
    const itemId = e.dataTransfer.getData("itemId");

    addItemToShopper(shopperId, itemId);
  };

  const addItemToShopper = async (shopperId, itemId) => {
    try {
      await addShopperToItem(itemId, shopperId);
      getShoppers();
      getItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDelete = async (itemId, shopperId) => {
    try {
      await deleteShopperFromItem(itemId, shopperId);
      getShoppers();
      getItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await addUser(name);
      refreshUsersData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddShopper = async (name) => {
    try {
      await addShopper(name, selectedUser._id);
      getShoppers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddItem = async (name) => {
    try {
      await addItem(name, selectedUser._id);
      getItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      getItems();
      getShoppers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteShopper = async (shopperId) => {
    try {
      await deleteShopper(shopperId);
      getShoppers();
      getItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      refreshUsersData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        {/* USERS */}
        <div className="bg-red-50 h-[30vh] py-5 ">
          <div className="flex justify-center  items-center gap-2">
            <h2 className="text-xl font-bold text-center">Users</h2>
            <button
              onClick={() => setAddUserModalVisible(true)}
              className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
            >
              Click to ADD
            </button>
          </div>
          <div className="flex gap-4 overflow-auto  py-4 px-10">
            {users &&
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className="relative"
                >
                  <UserCard
                    name={user.name}
                    selected={
                      selectedUser ? selectedUser._id === user._id : false
                    }
                  />
                  <MdDeleteOutline
                    onClick={() => handleDeleteUser(user._id)}
                    className="absolute cursor-pointer -top-1.5 border-[1px] border-white -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full p-0.5"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex h-[70vh]">
          {/* SHOPPERS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-blue-50 overflow-auto">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-xl font-bold text-center">Shoppers</h2>
              <button
                onClick={() => setAddShopperModalVisible(true)}
                className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
              >
                Click to ADD
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {currentShoppers &&
                currentShoppers.map((shopper) => (
                  <div
                    key={shopper._id}
                    className="w-fit h-fit relative"
                    onDrop={(e) => handleOnDrop(e, shopper._id)}
                    onDragOver={(e) => handleDragOver(e)}
                  >
                    <ShopperCard
                      name={shopper.name}
                      items={shopper.items}
                      onDelete={handleItemDelete}
                      shopperId={shopper._id}
                    />
                    <MdDeleteOutline
                      onClick={() => handleDeleteShopper(shopper._id)}
                      className="absolute cursor-pointer -top-1.5 border-[1px] border-white -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full p-0.5"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* ITEMS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-green-50 overflow-auto">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-xl font-bold text-center">Items</h2>
              <button
                onClick={() => setAddItemModalVisible(true)}
                className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
              >
                Click to ADD
              </button>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {currentItems &&
                currentItems.map((item) => (
                  <div
                    key={item._id}
                    onDragStart={(e) => handleOnDrag(e, item._id)}
                    draggable
                    className="w-fit h-fit relative"
                  >
                    <ItemCard item={item.name} active={item.active} />
                    <MdDeleteOutline
                      onClick={() => handleDeleteItem(item._id)}
                      className="absolute cursor-pointer -top-1.5 border-[1px] border-white -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full p-0.5"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* SIMPLE MODALS FOR ADDING  */}
      {addUserModalVisible && (
        <AddModal
          title={"Add User"}
          setModalVisible={setAddUserModalVisible}
          onAdd={handleAddUser}
        />
      )}
      {addShopperModalVisible && (
        <AddModal
          title={"Add Shopper"}
          setModalVisible={setAddShopperModalVisible}
          onAdd={handleAddShopper}
        />
      )}
      {addItemModalVisible && (
        <AddModal
          title={"Add Item"}
          setModalVisible={setAddItemModalVisible}
          onAdd={handleAddItem}
        />
      )}
    </>
  );
};

export default Home;
