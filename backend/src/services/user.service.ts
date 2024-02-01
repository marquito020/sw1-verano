import { PrismaClient } from "@prisma/client";

import { User } from "../interfaces/user.interface.js";
import { encrypt } from "../utils/bcrypt.utils.js";

const prisma = new PrismaClient();

const getAllUsers = async () => {
  // const userFields: Prisma.UserSelect = {
  //   id: true, name: true, email: true, phone: true, address: true
  // }
  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true, phone: true, address: true },
    // orderBy: { id: "asc" },
  });
  return allUsers;
};

const addUser = async ({ name, email, password }: User) => {
  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) return null;

  const passwordHash = await encrypt(password);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      imageSecureUrl: "",
      imagePublicId: "",
      rolId: 4,
    },
    select: { id: true, name: true, email: true, phone: true, address: true },
  });

  return newUser;
};

const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  return user;
};

const updateUser = async (id: number, dataUser: Partial<User>) => {
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) return null;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: dataUser.name,
      email: dataUser.email,
      phone: dataUser.phone ? dataUser.phone : null,
      address: dataUser.address,
    },
  });

  return updatedUser;
};

const deleteUser = async (id: number) => {
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) return null;

  const deletedUser = await prisma.user.delete({ where: { id } });
  return deletedUser;
};

export default { getAllUsers, addUser, getUser, updateUser, deleteUser };
