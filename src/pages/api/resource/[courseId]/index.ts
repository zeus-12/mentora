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
    const { file_name, file_url, file_type } = req.body;

    if (!file_name || !file_url || !file_type) {
      return res.status(400).json({ error: "Incomplete Data!" });
    }

    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const user = session?.user?.email;

    try {
      await dbConnect();
      let resource = await Resource.findOne({ course_id: courseId }).lean();

      if (!resource) {
        // @ts-ignore
        resource = { course_id: courseId };
        // @ts-ignore
        resource.resources = [
          { file_name, file_url, file_type, uploader: user },
        ];
        await Resource.create(resource);
        return res.status(400).json({ success: "Added files!" });
      }

      // @ts-ignore
      resource.resources.push({
        file_name,
        file_type,
        file_url,
        uploader: user,
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

  // const { courseId } = req.query;
  // if (!courseId) {
  //   return res.status(400).json({ message: "Missing course ID" });
  // }

  // if (req.method === "GET") {
  //   // get names of all blob files
  //   const getBlobNames = async () => {
  //     const accountKey = process.env.AZURE_ACCOUNT_KEY;
  //     if (!accountKey) throw Error("Azure Storage accountKey not found");

  //     const sharedKeyCredential = new StorageSharedKeyCredential(
  //       "mentora",
  //       accountKey
  //     );

  //     const blobServiceClient = new BlobServiceClient(
  //       `https://mentora.blob.core.windows.net`,
  //       sharedKeyCredential
  //     );

  //     const containerClient = blobServiceClient.getContainerClient("course");
  //     // GET PARTICULAR DIRECTORY FROM CONTAINER CLIENT

  //     const res = [];

  //     for await (const blob of containerClient.listBlobsFlat()) {
  //       const tempBlockBlobClient = containerClient.getBlockBlobClient(
  //         blob.name
  //       );
  //       res.push(tempBlockBlobClient.url);
  //     }

  //     return res;
  //   };

  //   const data = await getBlobNames();
  //   res.status(200).json(data);
  // } else {
  //   res.status(400).json({ error: "Invalid Method" });
  // }
}
