import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  // Convert file -> buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Auth setup
  const auth = Buffer.from(
    `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`
  ).toString("base64");

  // Upload to WP Media endpoint
  const res = await fetch(`${process.env.WP_API_URL}/media`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Disposition": `attachment; filename="${file.name}"`,
      "Content-Type": file.type,
    },
    body: buffer,
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ error: data }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, media: data }));
}
