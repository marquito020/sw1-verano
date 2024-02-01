import { baseUrl } from "../constants/routes";
import { Auth } from "../interfaces/auth.interface";
import { NewUser } from "../interfaces/user.interface";

export const authRegisterUrl = baseUrl + "api/register";
export const authLoginUrl = baseUrl + "api/login";

const login = async (url: string, { arg }: { arg: Auth }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const registerNewUser = async (url: string, { arg }: { arg: NewUser }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export { registerNewUser, login };
