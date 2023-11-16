import React, { useEffect, useState } from "react";
import ShopperCard from "../components/ShopperCard";
import useUsers from "../utils/useUsers";
import UserCard from "../components/UserCard";
import { addShopper, getShoppersWithItemsForUser } from "../api/Shoppers";
import {
  addItem,
  addShopperToItem,
  deleteShopperFromItem,
  getItemsForUser,
} from "../api/Items";
import ItemCard from "../components/ItemCard";
import toast from "react-hot-toast";
import AddModal from "../components/ModalDialogs/AddModal";
import { addUser } from "../api/Users";

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

  return (
    <>
      <div className="min-h-screen">
        {/* USERS */}
        <div className="bg-red-50 h-[25vh] py-5 px-10">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-xl font-bold text-center">Users</h2>
            <button
              onClick={() => setAddUserModalVisible(true)}
              className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
            >
              Click to ADD
            </button>
          </div>
          <div className="flex gap-4 overflow-auto">
            {users &&
              users.map((user) => (
                <div key={user._id} onClick={() => setSelectedUser(user)}>
                  <UserCard
                    name={user.name}
                    selected={
                      selectedUser ? selectedUser._id === user._id : false
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex h-full">
          {/* SHOPPERS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-blue-50">
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
                    className="w-fit h-fit"
                    onDrop={(e) => handleOnDrop(e, shopper._id)}
                    onDragOver={(e) => handleDragOver(e)}
                  >
                    <ShopperCard
                      name={shopper.name}
                      items={shopper.items}
                      onDelete={handleItemDelete}
                      shopperId={shopper._id}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* ITEMS */}
          <div className="flex-1 py-5 px-10 gap-5 flex flex-col bg-green-50">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-xl font-bold text-center">Items</h2>
              <button
                onClick={() => setAddItemModalVisible(true)}
                className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
              >
                Click to ADD
              </button>
            </div>
            <div className="grid grid-flow-col-dense gap-5">
              {currentItems &&
                currentItems.map((item) => (
                  <div
                    key={item._id}
                    onDragStart={(e) => handleOnDrag(e, item._id)}
                    draggable
                    className="w-fit h-fit"
                  >
                    <ItemCard item={item.name} active={item.active} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
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
