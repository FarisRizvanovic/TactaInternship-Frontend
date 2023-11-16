import axiosInstance from "./AxiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");

  return response;
};

export const addUser = async (name) => {
  const response = await axiosInstance.post("/users", { name });

  return response;
};
