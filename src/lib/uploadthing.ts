import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "@/utils/getServerSession";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
const f = createUploadthing();

export const ourFileRouter = {
  courseResourcesUploader: f
    .fileTypes(["image", "video"])
    .maxSize("8MB")
    .middleware(async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getServerSession(req, res);
      if (!session) throw new Error("Unauthorized");

      const user = session.user!;

      return { email: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url, "email", metadata.email);
      // upload to db
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
