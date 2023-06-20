import { SERVER_URL } from "@/lib/constants";
import getServerSession from "@/utils/getServerSession";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import z from "zod";

const f = createUploadthing();

export const uploadRouter = {
  courseResourcesUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 4,
    },
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  })
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .middleware(async (opts) => {
      const { req, res, input } = opts;

      const session = await getServerSession(req, res);
      if (!session) throw new Error("Unauthorized");

      const user = session.user!;

      return { email: user.email, courseId: input.courseId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await fetch(`${SERVER_URL}/api/resource/${metadata.courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_name: file.name,
          file_url: file.url,
          uploader: metadata.email,
          file_type: file.url.endsWith(".pdf") ? "pdf" : "image",
        }),
      }).catch((res) => console.log(res.json()));
    }),
} satisfies FileRouter;

export type uploadRouter = typeof uploadRouter;
