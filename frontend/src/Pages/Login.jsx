import React, { useState } from "react";
import axios from 'axios'
import { useDispatch, } from "react-redux";
import { addUser } from "../Store/Slice/authSlice";
import { Link, useNavigate } from "react-router";
import { showToast } from "../Components/ShowToast";
import { BASE_URL } from "../utils/constant";

const Login = () => {
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        emailId: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Logging in with:", formData);
        try {

            const res = await axios.post(BASE_URL + '/api/v1/login', formData, {
                withCredentials: true,
            });
            dispatch(addUser(res?.data?.user))
            localStorage.setItem("token", res?.data?.token);
            setError("")
            showToast("Login Successfully!", 'success')
            navigate("/feed")

        } catch (err) {
            if (err.response) {
                const data = err.response.data;

                if (Array.isArray(data.errors) && data.errors.length > 0) {
                    setError(data.errors[0].message);
                } else if (data.error) {
                    setError(data.error);
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
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                name="emailId"
                                type="email"
                                required
                                placeholder="example@abc.com"
                                autoComplete="email"
                                value={formData.emailId}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-blue-500 hover:text-blue-600">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                placeholder="••••••••"
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
                            Log in
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-white">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-blue-500 hover:text-blue-600">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
