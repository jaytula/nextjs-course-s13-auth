import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (req, res) => {
  if(req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({req: req})
  if(!session) {
    res.status(401).json({message: 'Not authenticated!'});
    return;
  }
}

export default handler