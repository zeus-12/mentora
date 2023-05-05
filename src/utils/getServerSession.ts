import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const getServerSession = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  return session;
};

export default getServerSession;
