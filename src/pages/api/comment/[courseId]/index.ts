// fetch all comments for a particular course
import getServerSession from "@/utils/getServerSession";
import Comments from "@/models/comment";
import dbConnect from "@/lib/dbConnect";

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
      let comments = await Comments.find({
        course_id: courseId,
      }).lean();

      const session = await getServerSession(req, res);
      const user = session?.user?.email;

      if (user) {
        comments.forEach((comment) => {
          comment.liked = comment.liked_users?.includes(user);
        });
      }

      comments.forEach((comment, i) => {
        comment.like_count = comment.liked_users?.length || 0;

        if (comment.parent_id) {
          const parentComment = comments.find(
            (c) => (c._id as string).toString() === comment.parent_id
          );

          if (parentComment) {
            parentComment.subComments = parentComment.subComments || [];
            parentComment.subComments.push(comment);
          }
        }
      });

      comments = comments.filter((item) => !item.parent_id);

      res.status(200).json({ success: "success", data: comments });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    await dbConnect();
    const { comment } = req.body;

    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "Please Sign in to add a course" });
      return;
    }
    const user = session?.user?.email;

    try {
      const newComment = await Comments.create({
        user,
        course_id: courseId,
        comment,
      });
      res.status(200).json({ success: true, data: newComment });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
}
