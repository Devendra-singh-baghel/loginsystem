import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <div className="flex items-center justify-end p-3 text-xl font-bold">
      <Link to={"/login"} className="cursor-pointer rounded-lg bg-blue-400 p-2">
        Login
      </Link>
    </div>
  );
}

export default Home;
