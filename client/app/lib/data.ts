import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkLogin() {
  const token = cookies().get("session");
  if (!token) {
    redirect("/");
  }

  try {
    let data = await axios.get(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser`,
      {
        headers: {
          "Content-Type": "application/json",
          Host: "posts.com",
        },
      }
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    console.log("error came in check login");
  }
}
