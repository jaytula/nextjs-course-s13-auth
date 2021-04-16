import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  return hash(password, 12);
};
