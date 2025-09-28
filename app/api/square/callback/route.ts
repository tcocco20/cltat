// app/api/square/callback/route.ts
import { SQUARE_ACCESS_TOKEN, SQUARE_APP_ID } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: `OAuth error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code found" },
      { status: 400 }
    );
  }

  // Exchange the code for an access token
  const resp = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://connect.squareup.com/oauth2/token"
      : "https://connect.squareup.com/oauth2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: SQUARE_APP_ID,
        client_secret: SQUARE_ACCESS_TOKEN,
        code,
        grant_type: "authorization_code",
      }),
    }
  );

  const data = await resp.json();

  if (!resp.ok) {
    return NextResponse.json({ error: data }, { status: 400 });
  }

  // Instead of storing, just return JSON directly so you can copy it
  return NextResponse.json(data);
}
