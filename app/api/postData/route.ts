"use server";
import { sheetsData } from "@/types/types";
import { google } from "googleapis";

const transformData = (data: any[][]): sheetsData[] => {
  const headers = data[0];
  return data.slice(1).map((row) => {
    const obj: { [key: string]: any } = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return {
      id: Number(obj["id"]),
      name: obj["name"],
      category: obj["category"],
      address: obj["address"],
      phone: obj["phone"],
      line_id: obj["line"],
      facebook: obj["facebook"],
      instagram: obj["instagram"],
      image: obj["img"],
      google_map_link: obj["google_map_link"],
    } as sheetsData;
  });
};

const getData = async (range: string) => {
  const auth = await google.auth.getClient({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: auth });
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });
    const data = transformData(res.data.values ?? []);
    return data;
  } catch (error) {
    console.log("Fetching error", error);
    return [];
  }
};

export const GET = async (req: Request) => {
  const range = "Sheet1!A1:J";
  const data = await getData(range);
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0, ",
    },
  });
};
