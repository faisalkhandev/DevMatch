import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { showToast } from "../Components/ShowToast";
import { useNavigate } from 'react-router';

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
    });
    const [error, setError] = useState(null)

    // Update state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(BASE_URL + "/api/v1/signup", formData);
            setError("")
            navigate("/login");
            showToast("Account created successfully! Please log in.", 'success');
        } catch (err) {

            if (err.response) {
                const data = err.response.data;


                if (Array.isArray(data.errors) && data.errors.length > 0) {
                    setError(data.errors[0].message);
                    showToast(data.errors[0].message, 'error');
                } else if (data.error) {
                    setError(data.error);
                    showToast(data.error, 'error');
                } else {
                    setError("An unknown error occurred. Please try again.");
                }
            } else {
                setError("An unknown error occurred. Please try again.");
            }
        }

    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    Create a new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-white"
                        >
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-white"
                        >
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="emailId"
                            className="block text-sm font-medium text-white"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="emailId"
                                name="emailId"
                                type="email"
                                required
                                autoComplete="email"
                                value={formData.emailId}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-white"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-[18px]">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                {/* Login message */}
                <div className="mt-6 text-center text-sm text-white">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-semibold text-blue-500 hover:text-blue-600"
                    >
                        Log in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
