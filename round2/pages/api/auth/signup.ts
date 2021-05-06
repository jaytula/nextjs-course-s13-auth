import { hash } from "bcryptjs";
import { NextApiHandler } from "next";
import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(403).end();
    return;
  }

  const { email, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message:
          "Invalid input - password should be at least 7 characters long",
      });
    return;
  }

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({email})

  if(existingUser) {
    res.status(422).json({message: 'User exists already'})
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    email,
    password: hashedPassword,
  };

  const result = await usersCollection.insertOne(newUser);
  client.close();

  res.status(201).json({
    message: "Created user",
    result: result.insertedId,
  });
};

export default handler;
