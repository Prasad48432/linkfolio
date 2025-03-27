"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LinkedInLogin() {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth/linkedin/callback`
      : "";
  const scope = "openid profile w_member_social email";

  // State for authUrl (initialized in useEffect to avoid hydration mismatch)
  const [authUrl, setAuthUrl] = useState("");

  // Set up authUrl after component mounts
  useEffect(() => {
    setAuthUrl(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scope)}&state=${generateRandomState()}`
    );
  }, []);

  function generateRandomState() {
    return Math.random().toString(36).substring(2, 15);
  }

  return (
    <div className="mb-8">
      <p className="mb-4">Connect with LinkedIn to view your profile data:</p>
      {authUrl && (
        <a
          href={authUrl}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Connect with LinkedIn
        </a>
      )}
    </div>
  );
}
