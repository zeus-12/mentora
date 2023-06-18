import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { uploadRouter } from "@/lib/uploadthing";

const handler = createNextPageApiHandler({
  router: uploadRouter,
});

export default handler;
