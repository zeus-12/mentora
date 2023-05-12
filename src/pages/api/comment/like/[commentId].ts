import Comment from "@/models/comment";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

    const { commentId } = req.query;
    if (!commentId) {
      res.status(400).json({ error: "Please provide a Comment id" });
      return;
    }

    await dbConnect();

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ error: "comment not found" });
      return;
    }
    const { liked_users } = comment;

    if (liked_users.includes(user)) {
      liked_users.splice(liked_users.indexOf(user), 1);
      await comment.save();
      res.status(200).json({ success: "Unliked" });
      return;
    }

    liked_users.push(user);
    await comment.save();
    res.status(200).json({ success: "Liked" });
    return;
  }
}
