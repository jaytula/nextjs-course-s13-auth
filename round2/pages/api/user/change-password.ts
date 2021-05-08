import { compare, hash } from "bcryptjs";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'PATCH') {
    res.status(405).json({message: 'Method disallowed'})
    return;
  }

  const session = await getSession({req: req});

  if(!session) {
    res.status(401).json({message: 'Not authenticated'});
    return;
  }

  const userEmail = session.user.email;
  const {newPassword, oldPassword} = req.body;

  const client = await connectToDatabase();
  const usersCollection = await client.db().collection('users');

  const user = await usersCollection.findOne({email: userEmail});

  if(!user) {
    res.status(404).json({message: 'User not found'})
    client.close();
    return;
  }

  const passwordsAreEqual = await compare(oldPassword, user.password);

  if(!passwordsAreEqual) {
    res.status(403).json({message: 'Old password does not match'})
    client.close();
    return;
  }

  const hashedPassword = await hash(newPassword, 12);
  const result = await usersCollection.updateOne({email: userEmail}, {$set: { password: hashedPassword}})

  client.close();
  res.status(201).json({
    message: 'Password updated',
    modifiedCount: result.modifiedCount
  })
}

export default handler