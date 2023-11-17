import { useEffect, useState } from "react";
import { addUser, deleteUser, getUsers } from "../api/Users";
import toast from "react-hot-toast";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleAddUser = async (name) => {
    try {
      await addUser(name);
      refreshUsersData();
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

  const handleGetUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.data.users);
      setUsersLoading(false);
    } catch (error) {
      setUsersError("Error while fetching users");
      setUsersLoading(false);
    }
  };

  const refreshUsersData = async () => {
    handleGetUsers();
  };

  return {
    users,
    usersLoading,
    usersError,
    refreshUsersData,
    handleAddUser,
    handleDeleteUser,
  };
};

export default useUsers;
