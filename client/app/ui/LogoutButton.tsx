import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        cookies().delete("session");
        redirect("/");
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
};

export default LogoutButton;
