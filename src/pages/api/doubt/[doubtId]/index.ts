import Doubt from "@/models/doubt";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { doubtId } = req.query;

  if (req.method === "GET") {
    await dbConnect();
    try {
      const doubt = await Doubt.findOne({ _id: doubtId })
        .select("title course_id doubt user status")
        .lean();
      return res.status(200).json({ message: "success", data: doubt });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid request" });
  }
}
