"use server";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    let response = await axios.post(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signin`,
      {
        email: formData.get("email") as string | null,
        password: formData.get("password") as string | null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          //so that ingrix knows which domain you wanna use
          Host: "posts.com",
        },
      }
    );
    //do
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      // Set the cookie in the server-side response
      const nextResponse = NextResponse.next();
      nextResponse.headers.append("Set-Cookie", setCookieHeader.join("; "));
      return nextResponse;
    }

    redirect("/dashboard");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      throw error;
    }
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  try {
    const { data } = await axios.post(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup`,
      rawFormData, // Include your data object as the second argument for POST request
      {
        headers: {
          "Content-Type": "application/json",
          Host: "posts.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error came in register");
    return (error as AxiosError).response?.data;
  }
}
