"use client";
import { logout } from "./action";

export default function LogoutButton() {
  return <p className="text-red-300" onClick={() => logout()}>Logout</p>;
}
