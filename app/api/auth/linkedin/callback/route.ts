import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code" },
      { status: 400 }
    );
  }

  // Exchange code for access token
  const tokenResponse = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      }),
    }
  );

  console.log("token_response", tokenResponse);

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: tokenData.error_description },
      { status: 400 }
    );
  }

  const { access_token } = tokenData;

  console.log("access_token", access_token);

  // Fetch LinkedIn Profile
  const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  console.log("profileResponse", profileResponse);

  const profileData = await profileResponse.json();
  if (!profileResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn profile" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "LinkedIn Login Success",
    profile: profileData,
  });
}
