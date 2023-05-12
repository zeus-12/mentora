import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/lib/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
