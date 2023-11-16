import axiosInstance from "./AxiosInstance";

export const getShoppersWithItemsForUser = async (userId) => {
  const response = await axiosInstance.get(`/shoppers/user/${userId}/items`);
  return response;
};

export const addShopper = async (name, userId) => {
  const response = await axiosInstance.post(`/shoppers`, { name, userId });
  return response;
};
