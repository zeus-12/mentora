import Resource from "@/models/resource";
import dbConnect from "@/lib/dbConnect";
import getServerSession from "@/utils/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query as { courseId: string };
  if (req.method === "POST") {
    const { file_name, file_url, uploader, file_type } = req.body;

    if (
      !file_name ||
      !file_url ||
      !uploader ||
      !file_type ||
      !file_type.includes("pdf", "image")
    ) {
      return res.status(400).json({ error: "Incomplete Data!" });
    }

    // const session = await getServerSession(req, res);

    // if (!session) {
    //   return res.status(401).json({ error: "Not logged in" });
    // }

    try {
      await dbConnect();
      let resource = await Resource.findOne({ course_id: courseId });

      if (!resource) {
        resource = { course_id: courseId };
        resource.resources = [{ file_name, file_url, uploader }];
        await Resource.create(resource);
        return res.status(400).json({ success: "Added files!" });
      }

      resource.resources.push({
        file_name,
        file_url,
        uploader,
        file_type,
      });
      await Resource.findOneAndUpdate({ course_id: courseId }, resource);

      return res.status(400).json({ success: "Added files!" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();
      const resources = await Resource.findOne({ course_id: courseId }).lean();

      return res.status(200).json({ success: "success", data: resources });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
