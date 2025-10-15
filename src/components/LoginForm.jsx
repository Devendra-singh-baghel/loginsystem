import React from "react";
import { Link } from "react-router";

function LoginForm() {
  return (
    <div className="mt-20 flex flex-col w-full items-center justify-center place-self-center rounded-md bg-slate-200 p-10 shadow-lg md:max-w-3/6 lg:max-w-2/6 xl:max-w-1/4">
      <div>
        <h1 className="mb-10 text-center text-2xl font-bold">Login</h1>
      </div>

      <form className="mx-auto flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Phone: </label>
          <input
            type="text"
            name="phone"
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Password: </label>
          <input
            type="password"
            name="password"
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
        </div>

        <div className="w-2/3">
          <button className="mt-5 w-full cursor-pointer rounded-md bg-blue-400 p-2 duration-300 hover:bg-blue-500">
            Login
          </button>
        </div>
      </form>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm">
        <span>Don't have an account</span>
        <Link
          to={"/register"}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Register Here
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
