import { z } from "zod";

const validEmail = z.string().email();

const isValidEmail = (email: string) => {
  const response = validEmail.safeParse(email);
  return response.success;
};

export { isValidEmail };
