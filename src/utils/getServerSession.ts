import { getServerSession as getDefaultServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

const getServerSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getDefaultServerSession(req, res, authOptions);
  return session;
};

export default getServerSession;
