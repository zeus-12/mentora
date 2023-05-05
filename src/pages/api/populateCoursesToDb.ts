// only use when needed

// const data = require("../../../small-4.json");
// import Course from "../../models/course";
// import dbConnect from "../../lib/dbConnect";
// export default async function handler(req, res) {
//   await dbConnect();

//   const promises = data.map(async (item) => {
//     return await Course.create(item);
//   });
//   Promise.all(promises);
//   res.status(200).json({ success: true });
// }
