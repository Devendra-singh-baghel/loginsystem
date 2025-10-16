import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginForm() {
  const [loginDetail, setLoginDetail] = useState({
    phone: "",
    password: "",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  //validation rules
  const formValidationRules = {
    phone: [
      {
        required: true,
        message: "Please enter your phone number.",
      },
      {
        pattern: /^[0-9]+$/,
        message: "Phone number should contain digits only.",
      },
    ],

    password: [
      {
        required: true,
        message: "Please enter a password.",
      },
    ],
  };

  //validation function
  const validation = (formData) => {
    const errorData = {};

    //Object.entries converts formData into an array of [key, value] pairs
    Object.entries(formData).forEach(([key, value]) => {

      formValidationRules[key].some((rule) => {

        if (!formValidationRules[key]) return;

        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });

    // Check credentials only if user exists
    if (user) {
      if (!errorData.phone && formData.phone !== user.phone) {
        errorData.phone = "Phone number not registered.";
      } else if (!errorData.password && formData.password !== user.password) {
        errorData.password = "Invalid password.";
      }
    }

    setError(errorData);
    return errorData;
  };

  //submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError({ phone: "No user found. Please register first." });
      return;
    }

    const validationResult = validation(loginDetail);

    if (Object.keys(validationResult).length) return;

    //avoid storing password in sessionStorage.
    const { password, ...userData } = user;
    sessionStorage.setItem("activeUser", JSON.stringify(userData));

    setLoginDetail({
      phone: "",
      password: "",
    });

    navigate("/profile");
  };

  //onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError({});
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center place-self-center rounded-md bg-slate-200 p-10 shadow-lg md:max-w-3/6 lg:max-w-2/6 xl:max-w-1/4">
      <div>
        <h1 className="mb-10 text-center text-2xl font-bold">Login</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full flex-col items-center justify-center gap-5"
      >
        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Phone: </label>
          <input
            type="text"
            name="phone"
            value={loginDetail.phone}
            onChange={handleChange}
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {error && <p className="text-xs text-red-600">{error.phone}</p>}
        </div>

        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Password: </label>
          <input
            type="password"
            name="password"
            value={loginDetail.password}
            autoComplete="off"
            onChange={handleChange}
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {error && <p className="text-xs text-red-600">{error.password}</p>}
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
