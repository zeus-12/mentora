import { google } from "googleapis";
import getServerSession from "@/utils/getServerSession";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { anonymous, message, feedbackType } = req.body;

    if (
      !["bug", "suggestion", "other", "appreciate"].includes(feedbackType) ||
      !message
    ) {
      res.status(422).json({ error: "Invalid input." });
      return;
    }

    let email;
    if (!anonymous) {
      const session = await getServerSession(req, res);
      if (!session) {
        res.status(403).json({
          error: "Either pick anonymous or sign in to send a feedback",
        });
        return;
      }

      email = session?.user?.email;
    }

    let fields = [feedbackType, message, email ? email : "Anonymous"];

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: (process.env.GOOGLE_SERVICE_PRIVATE_KEY as string).replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A2:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [Object.values(fields)],
      },
    });

    res.status(200).json({ success: "success" });
    return;
  } else {
    res.status(400).json({ error: "Invalid method!" });
  }
}
