import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID!;
  const redirectUri = "http://localhost:3000/api/auth/linkedin/callback";
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code
  &client_id=${clientId}
  &redirect_uri=${redirectUri}
  &scope=openid%20profile%20email`;

  return NextResponse.redirect(linkedInAuthUrl);
}
