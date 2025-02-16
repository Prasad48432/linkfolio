"use client";
import React, { Suspense } from "react";
import Blogs from "./blogspage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blogs />
    </Suspense>
  );
}
