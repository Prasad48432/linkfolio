import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY!;
    const LIST_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID!;
    const DATACENTER = API_KEY.split("-")[1]; // Extract datacenter from API key

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Subscription successful!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Subscription failed!" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: `"Server error!" ${error}` }, { status: 500 });
  }
}
