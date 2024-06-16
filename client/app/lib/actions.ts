"use server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

interface ErrorResponse {
  errors: { message: string }[];
}

export async function authenticate(
  prevState: ErrorResponse | undefined,
  formData: FormData
) {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  console.log("before middleware");
  try {
    const response = await axios.post(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signin`,
      rawFormData,
      {
        headers: {
          "Content-Type": "application/json",
          Host: "posts.com", // so that ingress knows which domain you want to use
        },
      }
    );
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookie) => {
        const [cookieName, ...cookieAttributes] = cookie.split("=");
        cookies().set(cookieName, cookieAttributes.join("="), {
          httpOnly: false,
        });
      });
    }
    console.log("i set the cookies");
  } catch (error) {
    return (error as AxiosError<ErrorResponse>).response?.data;
  }
  redirect("/dashboard");
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
