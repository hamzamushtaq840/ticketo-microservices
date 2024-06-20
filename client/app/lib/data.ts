import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkLogin() {
  const token = cookies().get("session");
  if (!token) {
    redirect("/");
  }
}
