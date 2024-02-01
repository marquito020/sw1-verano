import { NewUser, User } from "../interfaces/user.interface";
import { baseUrl } from "../constants/routes";

export const usersUrl = baseUrl + "api/users";

const getAllUsers = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addUser = async (url: string, { arg }: { arg: NewUser }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

// en el use mandar el id useGetUser(id)
const getUser = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateUser = async (url: string, { arg }: { arg: Partial<User> }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

export { getAllUsers, addUser, getUser, updateUser, deleteUser };
