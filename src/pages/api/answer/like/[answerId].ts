import Answer from "@/models/answer";
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

    const { answerId } = req.query;
    if (!answerId) {
      res.status(400).json({ error: "Please provide an answer id" });
      return;
    }

    await dbConnect();

    const answer = await Answer.findById(answerId);
    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
      return;
    }
    const { liked_users } = answer;

    if (liked_users?.includes(user)) {
      liked_users.splice(liked_users.indexOf(user), 1);
      await answer.save();
      res.status(200).json({ success: "Unliked" });
      return;
    }

    liked_users.push(user);
    await answer.save();
    res.status(200).json({ success: "Liked" });
    return;
  }
}
