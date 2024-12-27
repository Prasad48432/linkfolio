"use client";

import React, { Suspense } from "react";
import ResetPassword from "./reset_password_form";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
