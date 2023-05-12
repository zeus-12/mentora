// for the COURSE SECTION
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query;
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    await dbConnect();
    try {
      const courseDetails = await Course.findOne({
        course_id: courseId,
      }).lean();

      res.status(200).json({ success: true, data: courseDetails });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
}
