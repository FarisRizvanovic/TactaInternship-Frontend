import axiosInstance from "./AxiosInstance";

export const getItemsForUser = async (userId) => {
  const req = await axiosInstance.get(`/items/${userId}`);
  return req;
};

export const addShopperToItem = async (itemId, shopperId) => {
  const response = await axiosInstance.put(`/items/${itemId}/${shopperId}`);
  return response;
};

export const deleteShopperFromItem = async (itemId, shopperId) => {
  const response = await axiosInstance.delete(`/items/${itemId}/${shopperId}`);
  return response;
};

export const addItem = async (name, userId) => {
  const response = await axiosInstance.post("/items", { name, userId });
  return response;
};

export const deleteItem = async (itemId) => {
  const response = await axiosInstance.delete(`/items/${itemId}`);
  return response;
};
