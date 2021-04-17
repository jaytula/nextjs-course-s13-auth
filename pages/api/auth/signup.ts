import { NextApiHandler } from "next";
import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'POST') {
    res.status(405).json({message: 'Method not allowed'})
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - password should be alt least 7 characters long",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const result = await db
    .collection("users")
    .insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user!" });
};

export default handler;
