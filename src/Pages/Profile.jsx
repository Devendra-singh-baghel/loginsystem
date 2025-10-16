import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

  useEffect(() => {
    if (!activeUser) {
      navigate("/login");
    }
  }, [activeUser, navigate]);

  if (!activeUser) {
    // return null to avoid rendering before redirect
    return null;
  }

  //logout handler function
  const logoutHandler = () => {
    sessionStorage.removeItem("activeUser");
    navigate("/login");
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center place-self-center rounded-md bg-slate-200 p-10 shadow-lg md:max-w-3/6 lg:max-w-2/6 xl:max-w-1/4">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Username:</p>
        <p className="text-xl font-semibold">{activeUser.username}</p>
      </div>

      <hr className="my-4 w-full border" />

      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Phone Number:</p>
        <p className="text-xl font-semibold">{activeUser.phone}</p>
        <button className="cursor-pointer text-lg" title="Edit">
          ✏️
        </button>
      </div>

      <button
        onClick={logoutHandler}
        className="mt-8 cursor-pointer rounded-lg bg-blue-500 p-2 px-6 font-medium text-white duration-300 hover:bg-blue-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
