import Buddy from "@/models/buddy";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { buddyId } = req.query;

    const session = await getServerSession(req, res);
    if (!session) {
      res.status(401).json({ error: "Please Sign in to add a course" });
      return;
    }
    const user = session?.user?.email;

    if (!user) {
      res.status(401).json({ error: "Please Sign in to apply for a buddy" });
      return;
    }

    try {
      await dbConnect();
      const buddy = await Buddy.findById(buddyId);
      if (!buddy) {
        res.status(404).json({ error: "Buddy not found" });
        return;
      }

      if (buddy.user === user) {
        res.status(400).json({ error: "You cannot apply for your own buddy" });
        return;
      }

      if (buddy.applied_users.includes(user)) {
        res
          .status(400)
          .json({ message: "You have already applied for this buddy" });
        return;
      }

      buddy.applied_users.push(user);
      await buddy.save();

      return res.status(200).json({ success: "success", data: buddy });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
