import { PrismaClient } from "@prisma/client";

import { Auth } from "../interfaces/auth.interface.js";
import { User } from "../interfaces/user.interface.js";

import { encrypt, verify } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

const prisma = new PrismaClient();

const registerNewUser = async ({ name, email, password }: User) => {
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
  });

  return newUser;
};

const login = async ({ email, password }: Auth, tokenMovil?: string) => {
  console.log("me llego el token", tokenMovil);
  const userFound = await prisma.user.findUnique({
    where: { email },
    include: { photographer: true, organizer: true, client: true, rol: true },
  });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);

  const photographer = userFound.photographer
    ? { id: userFound.photographer.id }
    : undefined;
  const organizer = userFound.organizer
    ? { id: userFound.organizer.id }
    : undefined;

  const client = userFound.client ? { id: userFound.client.id } : undefined;

  const userAndToken = {
    id: userFound.id,
    email: userFound.email,
    name: userFound.name,
    imageSecureUrl: userFound.imageSecureUrl,
    rol: { id: userFound.rol.id, name: userFound.rol.name },
    photographer,
    organizer,
    client,
    token,
  };

  // actualizar el token
  if (tokenMovil) {
    console.log("token actualizado");
    await prisma.user.update({
      where: { id: userFound.id },
      data: { tokenMovil },
    });
  }

  return userAndToken;
};

export default { registerNewUser, login };
