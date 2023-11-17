import { useState } from "react";
import toast from "react-hot-toast";
import {
  addItem,
  deleteItem,
  deleteShopperFromItem,
  getItemsForUser,
} from "../api/Items";

const useItems = () => {
  const [currentItems, setCurrentItems] = useState([]);

  const getItems = async (selectedUser) => {
    if (!selectedUser) return;
    try {
      console.log(selectedUser);
      const res = await getItemsForUser(selectedUser._id);
      setCurrentItems(res.data.data.items);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleAddItem = async (name, selectedUser) => {
    try {
      await addItem(name, selectedUser._id);
      await getItems(selectedUser);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleItemDelete = async (itemId, shopperId) => {
    try {
      await deleteShopperFromItem(itemId, shopperId);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return {
    currentItems,
    getItems,
    handleItemDelete,
    handleDeleteItem,
    handleAddItem,
  };
};

export default useItems;
