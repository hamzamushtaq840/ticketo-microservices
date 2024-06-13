"use client";

import { Button } from "@/app/ui/Button";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <form
      action={dispatch}
      className="bg-black h-screen flex justify-center items-center"
    >
      <div className="w-1/2 rounded-lg  pb-4 pt-8">
        <div className=" bg-black">
          <div>
            <div className="text-3xl my-10 w-full text-center">Register</div>
            <label
              className="mb-3 mt-5 block text-lg font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className=" block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-black text-black"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-lg font-medium text-white"
              htmlFor="password"
            >
              Passwords
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-black text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div
          className="flex py-1 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage?.errors?.map((err: { message: string }) => (
            <li className="text-sm text-red-500">{err.message}</li>
          ))}
        </div>
        <RegisterButton />
        <div className="mt-5 flex justify-end gap-1">
          Already have an account?
          <Link href={"/"} className="text-blue-500 hover:text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="mt-10 w-full flex justify-center items-center"
      aria-disabled={pending}
    >
      Register
    </Button>
  );
}
