// only use when needed

// const data = require("@/lib/COURSE_DATA.json");
// import Course from "@/models/course";
// import dbConnect from "@/lib/dbConnect";
// import * as COURSE_MAPPING from "@/lib/COURSE_MAPPING.json";
// import { NextRequest, NextResponse } from "next/server";
// export default async function handler(req: NextRequest, res: NextResponse) {
//   console.log("here");
//   await dbConnect();

//   const promises = Object.values(data).map(async (item: any) => {
//     await Course.create({
//       course_id: item.courseCode,
//       credits: Number(item.credits),
//       description: item.description,
//       course_type: item.courseType,
//       course_name:
//         COURSE_MAPPING[
//           item.courseCode.toUpperCase() as keyof typeof COURSE_MAPPING
//         ],
//       course_content: item.courseContent,
//       prerequisites: item.prerequisites,
//       text_books: item.textBooks,
//       reference_books: item.referenceBooks,
//     });
//   });
//   Promise.all(promises);
//   // @ts-ignore
//   return res.status(200).json({});
// }
