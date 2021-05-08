import { compare, hash } from "bcryptjs";
import { resolveSoa } from "dns";
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
}

export default handler