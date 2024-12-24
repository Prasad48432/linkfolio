"use client";

import React, { Suspense } from "react";
import ForgotPassword from "./forgot_password_form";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  );
}
