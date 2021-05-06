import { hash } from "bcryptjs";

export async function hashPassword(password) {
  return hash(password, 12);
}