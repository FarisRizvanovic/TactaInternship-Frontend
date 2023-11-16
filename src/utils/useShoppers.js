import { useEffect, useState } from "react";
import { getShoppersWithItemsForUser } from "../api/Shoppers";

const useShoppers = (userId) => {
  const [shopperss, setShoppers] = useState(null);
  const [shoppersLoading, setShoppersLoading] = useState(false);
  const [shoppersError, setShoppersError] = useState(null);

  useEffect(() => {
    handleGetShoppers();
  }, []);

  const handleGetShoppers = async () => {
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

  const refreshShoppersData = async () => {
    handleGetShoppers();
  };

  return { shopperss, shoppersLoading, shoppersError, refreshShoppersData };
};

export default useShoppers;
