//todo
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return;
  if (req.method === "DELETE") {
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
}
