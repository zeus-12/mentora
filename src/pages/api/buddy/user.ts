import Buddy from "@/models/buddy";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const session = await getServerSession(req, res);
  if (!session) {
    res.status(401).json({ error: "Please Sign in to add a course" });
    return;
  }
  const user = session?.user?.email;

  if (!user) {
    res.status(401).json({ error: "Please Sign in to add a course" });
    return;
  }

  try {
    await dbConnect();
    const appliedBuddyData = await Buddy.find({ user: user }).lean();
    return res.status(200).json({ success: "success", data: appliedBuddyData });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
