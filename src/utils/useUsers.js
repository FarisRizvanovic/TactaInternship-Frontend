import { useEffect, useState } from "react";
import { getUsers } from "../api/Users";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    handleGetUsers();
  }, []);

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

  return { users, usersLoading, usersError, refreshUsersData };
};

export default useUsers;
