// to reply to a comment
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import Comment from "@/models/comment";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId, commentId: parentCommentId } = req.query;
  if (!parentCommentId) {
    return res.status(400).json({ message: "Missing Parent comment ID" });
  }

  if (req.method === "POST") {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Missing Comment Data" });
    }

    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "Please Sign in to add a course" });
      return;
    }
    const user = session?.user?.email;

    await dbConnect();
    try {
      const newSubCommentDetails = await Comment.create({
        user,
        course_id: courseId,
        comment,
        parent_id: parentCommentId,
      });

      res.status(200).json({ success: true, data: newSubCommentDetails });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
}
