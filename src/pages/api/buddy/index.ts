import Buddy from "@/models/buddy";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { course_id, message, buddyType, money } = req.body;

    if (!money) {
      money = 0;
    }
    if (!course_id || !message || !buddyType) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const session = await getServerSession(req, res);
    const user = session?.user?.email;

    try {
      await dbConnect();
      const newBuddy = await Buddy.create({
        course_id,
        message,
        user,
        buddyType,
        money,
      });

      return res.status(200).json({ success: "success", data: newBuddy });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();
      const buddyDetails = await Buddy.find().lean();

      const session = await getServerSession(req, res);
      if (!session) {
        return res.status(200).json({ message: "success", data: buddyDetails });
      }

      const user = session?.user?.email;

      buddyDetails.map((buddy) => {
        if (buddy.applied_users?.includes(user)) {
          buddy.applied = true;
        } else {
          buddy.applied = false;
        }
        delete buddy.user;

        buddy.self = buddy.user === user;
      });

      return res.status(200).json({ message: "success", data: buddyDetails });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
