import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function RegisterForm() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //validation rules
  const formValidationRules = {
    username: [
      {
        required: true,
        message: "Please enter a username.",
      },
      {
        minLength: 3,
        message: "Username must be at least 3 characters long.",
      },
      {
        maxLength: 30,
        message: "Username cannot be longer than 30 characters.",
      },
    ],

    phone: [
      {
        required: true,
        message: "Please enter your phone number.",
      },
      {
        minLength: 10,
        message: "Phone number must be 10 digits long.",
      },
      {
        maxLength: 10,
        message: "Phone number must be 10 digits long.",
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
      {
        minLength: 6,
        message: "Password must be at least 6 characters long.",
      },
      {
        maxLength: 20,
        message: "Password cannot exceed 20 characters.",
      },
      {
        pattern:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]).+$/,
        message:
          "Password must include at least one letter, one number, and one special character.",
      },
    ],

    confirmPassword: [
      { required: true, message: "Please confirm your password." },
      { match: "password", message: "Passwords do not match." },
    ],
  };

  //validation function
  const validation = (formData) => {

    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {

      if (!formValidationRules[key]) return;

      formValidationRules[key].some((rule) => {

        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.match && value !== formData[rule.match]) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorData);
    return errorData;
  };

  //submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validation(userDetails);

    if (Object.keys(validateResult).length) return;


    //avoid storing confirmPassword in localStorage since it's only used for client-side validation and not required for the database.
    const { confirmPassword, ...userData } = userDetails;
    localStorage.setItem("user", JSON.stringify(userData));

    //reset form state
    setUserDetails({
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  };

  //onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center place-self-center rounded-md bg-slate-200 p-10 shadow-lg md:max-w-4/6 lg:max-w-3/6 xl:max-w-2/6">
      <div>
        <h1 className="mb-10 text-center text-2xl font-bold">Create Account</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full flex-col items-center justify-center gap-5"
      >
        <div className="flex w-full flex-col gap-1">
          <label className="text-lg font-semibold">Userame: </label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-lg font-semibold">Phone: </label>
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-lg font-semibold">Password: </label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-lg font-semibold">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            className="rounded-md border-none bg-white p-2 text-lg outline-none focus:ring focus:ring-gray-500"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="w-2/3">
          <button className="mt-5 w-full cursor-pointer rounded-md bg-blue-400 p-2 duration-300 hover:bg-blue-500">
            Register
          </button>
        </div>
      </form>

      <div className="mt-5 flex items-center justify-center gap-1 text-sm">
        <span>Already have an account</span>
        <Link
          to={"/login"}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Login Here
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
