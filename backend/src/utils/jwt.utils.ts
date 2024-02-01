import jsonwebtoken from "jsonwebtoken";
import { User } from "../interfaces/user.interface.js";

const { sign, verify } = jsonwebtoken;

const JWT_SECRET = process.env.JWT_SECRET || "token. 1010101";

type UserType = { id: number; email: string };

const generateToken = ({ id, email }: UserType) => {
  const jwt = sign({ id, email }, JWT_SECRET, {
    expiresIn: "12h",
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };
