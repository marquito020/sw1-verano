import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  usersUrl,
} from "../services/user.service";
import { NewUser, User } from "../interfaces/user.interface";

const useAllUser = () => {
  const { data, isLoading, error } = useSWR<User[]>(usersUrl, getAllUsers);

  return { users: data, isLoading, error };
};

const useAddUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    User,
    string,
    string,
    NewUser
  >(usersUrl, addUser);

  return { addUser: trigger, isMutating, error };
};

const useGetUser = (id: number) => {
  const { data, isLoading, error } = useSWR<User>(`${usersUrl}/${id}`, getUser);

  return { userFound: data, isLoading, error };
};

const useUpdateUser = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    User,
    string,
    string,
    Partial<NewUser>
  >(`${usersUrl}/${id}`, updateUser);

  return { updateUser: trigger, isMutating, error };
};

const useDeleteUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    User,
    string,
    string,
    number
  >(usersUrl, deleteUser);

  return { deleteUser: trigger, isMutating, error };
};

export { useAllUser, useAddUser, useGetUser, useUpdateUser, useDeleteUser };
