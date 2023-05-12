import Doubt from "@/models/doubt";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await dbConnect();
    try {
      const doubts = await Doubt.find({ status: "PENDING" })
        .sort({ date: -1 })
        .select("_id title course_id date")
        .lean();
      return res.status(200).json({ message: "success", data: doubts });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    const { course_id, doubt, title } = req.body;

    if (!course_id || !doubt || !title) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const user = session?.user?.email;

    try {
      await dbConnect();

      const newDoubt = await Doubt.create({
        course_id,
        doubt,
        user,
        title,
      });

      return res.status(200).json({ message: "success", data: newDoubt });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
