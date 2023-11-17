import { useState } from "react";
import { getShoppersWithItemsForUser } from "../api/Shoppers";

const useShoppers = () => {
  const [shoppers, setShoppers] = useState(null);
  const [shoppersLoading, setShoppersLoading] = useState(false);
  const [shoppersError, setShoppersError] = useState(null);

  const getShoppers = async (userId) => {
    setShoppersLoading(true);
    try {
      const response = await getShoppersWithItemsForUser(userId);
      setShoppers(response.data.data.shoppers);
      setShoppersLoading(false);
    } catch (error) {
      setShoppersError("Error while fetching users");
      setShoppersLoading(false);
    }
  };

  return { getShoppers, shoppers, shoppersLoading, shoppersError };
};

export default useShoppers;
