import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "@/utils/getServerSession";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const uploadRouter = {
  courseResourcesUploader: f(
    ["image"]
    // pdf: {
    //   maxFileSize: "16MB",
    //   maxFileCount: 4,
    // },
    // image: {
    //   maxFileSize: "4MB",
    //   maxFileCount: 4,
    // },
    // blob: {
    //   maxFileSize: "16MB",
    //   maxFileCount: 4,
    // },
  )
    .middleware(async (req: NextApiRequest, res: NextApiResponse) => {
      console.log(req.body);
      const session = await getServerSession(req, res);
      if (!session) throw new Error("Unauthorized");

      const user = session.user!;

      return { email: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url, "email", metadata.email);

      // WAIT FOR V5 TO ALLOW DATA TO BE PASSED FROM CLIENT

      // const updateCourseResources = async ({
      //   file_name,
      //   file_url,
      //   file_type,
      // }: {
      //   file_name: string;
      //   file_url: string;
      //   file_type: string;
      // }) => {
      //   await fetch(`/api/resource/${courseId}`, {
      //     ...postRequestConfig,
      //     body: JSON.stringify({
      //       file_name,
      //       file_url,
      //       file_type,
      //     }),
      //   });
      // };
    }),
} satisfies FileRouter;

export type uploadRouter = typeof uploadRouter;
