import React, { useEffect, useState } from "react";
import ShopperCard from "../components/ShopperCard";
import useUsers from "../utils/useUsers";
import UserCard from "../components/UserCard";
import {
  addShopper,
  deleteShopper,
  getShoppersWithItemsForUser,
} from "../api/Shoppers";
import { addShopperToItem } from "../api/Items";
import ItemCard from "../components/ItemCard";
import toast from "react-hot-toast";
import AddModal from "../components/ModalDialogs/AddModal";
import { MdDeleteOutline } from "react-icons/md";
import useDragAndDrop from "../utils/useDragAndDrop";
import useItems from "../utils/useItems";
import InformationModal from "../components/ModalDialogs/InformationModal";

const Home = () => {
  const { handleDragOver, handleOnDrag, handleOnDrop } = useDragAndDrop();
  const {
    currentItems,
    getItems,
    handleItemDelete,
    handleDeleteItem,
    handleAddItem,
  } = useItems();
  const { users, handleAddUser, handleDeleteUser } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentShoppers, setCurrentShoppers] = useState(null);

  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [addShopperModalVisible, setAddShopperModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [InformationModalVisible, setInformationModalVisible] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      getShoppers();
      getItems(selectedUser);
    }
  }, [selectedUser]);

  const getShoppers = async () => {
    try {
      const res = await getShoppersWithItemsForUser(selectedUser._id);
      setCurrentShoppers(res.data.data.shoppers);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addItemToShopper = async (shopperId, itemId) => {
    try {
      await addShopperToItem(itemId, shopperId);
      getShoppers();
      getItems(selectedUser);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteShopper = async (shopperId) => {
    try {
      await deleteShopper(shopperId);
      getShoppers();
      getItems(selectedUser);
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

  const handleAddItemWrapper = async (name) => {
    await handleAddItem(name, selectedUser);
  };

  const handleDeleteItemWrapper = async (itemId) => {
    await handleDeleteItem(itemId);
    await getShoppers();
    await getItems(selectedUser);
  };

  const deleteItemWrapper = async (itemId, shopperId) => {
    await handleItemDelete(itemId, shopperId, getShoppers);
    await getShoppers();
    await getItems(selectedUser);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* USERS */}
        <div className="bg-red-50 h-[30vh] py-5 ">
          <div className="flex justify-center w-full   items-center gap-2">
            <h2 className="text-xl font-bold text-center">Users</h2>
            <div
              className="flex gap-4
            "
            >
              <button
                onClick={() => setAddUserModalVisible(true)}
                className="bg-green-400 text-white font-bold px-2 py-1 rounded-md hover:bg-green-300"
              >
                Click to ADD
              </button>

              <button
                onClick={() => setInformationModalVisible(true)}
                className="bg-red-400 text-white font-bold px-2 py-1 rounded-md hover:bg-red-300"
              >
                READ ME FIRST
              </button>
            </div>
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
                    onDrop={(e) =>
                      handleOnDrop(e, shopper._id, addItemToShopper)
                    }
                    onDragOver={(e) => handleDragOver(e)}
                  >
                    <ShopperCard
                      name={shopper.name}
                      items={shopper.items}
                      onDelete={deleteItemWrapper}
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
                      onClick={() => handleDeleteItemWrapper(item._id)}
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
          onAdd={handleAddItemWrapper}
        />
      )}

      {/* MODAL FOR INFORMATION */}
      {InformationModalVisible && (
        <InformationModal setModalVisible={setInformationModalVisible} />
      )}
    </>
  );
};

export default Home;
