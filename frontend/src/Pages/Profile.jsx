import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { showToast } from "../Components/ShowToast";
import { addUser } from "../Store/Slice/authSlice";

const Profile = () => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const { firstName, lastName, gender, about, photoUrl, skills, age } = user || {};

    // Local state to manage edit mode
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName,
        lastName,
        gender,
        about,
        photoUrl,
        skills: skills || [],
        age,
    });
    const [newSkill, setNewSkill] = useState("");

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSkillChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleAddSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, newSkill],
            }));
            setNewSkill(""); // Clear input after adding skill
        }
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                ...formData,
                photoUrl: formData.photoUrl || photoUrl,
                age: formData.age ? Number(formData.age) : undefined,
            };

            await axios.patch(BASE_URL + "/api/v1/profile/edit", updatedData, {
                withCredentials: true,
            });

            showToast("Profile updated successfully!", "success");

            await fetchProfileData();

            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);

            if (error.response && error.response.data) {
                const { errors, message } = error.response.data;

                if (Array.isArray(errors)) {
                    errors.forEach(err => {
                        showToast(err.message, "error");
                    });
                } else {
                    showToast(message || "An error occurred", "error");
                }
            } else {
                showToast("Something went wrong", "error");
            }
        }

    };

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(BASE_URL + "/api/v1/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(response.data.user));
        } catch (error) {
            console.error("Error fetching updated profile:", error);
            showToast("Error fetching profile data", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={photoUrl || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mx-auto mt-4"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-white mx-5">
                                {(firstName + " " + lastName).toUpperCase()}
                            </h1>
                            <h3 className="mx-5">{user?.emailId}</h3>
                        </div>
                    </div>
                    <button
                        onClick={editMode ? handleSave : handleEditToggle}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        {editMode ? "Save" : "Edit"}
                    </button>
                </div>

                <div className="mt-6">
                    {/* First Name and Last Name Row */}
                    <div className="flex justify-end">
                        <div className="w-1/2">
                            <label className="block font-semibold text-white">First Name</label>
                            <div className="flex items-center ">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="block w-sm mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                        placeholder="First Name"
                                    />
                                ) : (
                                    <p className="text-white">{firstName}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <label className="block font-semibold text-white">Last Name</label>
                            <div className="mt-1">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="block w-sm mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                        placeholder="Last Name"
                                    />
                                ) : (
                                    <p className="text-white">{lastName}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gender and Age Row - Updated to match first/last name layout */}
                    <div className="flex justify-end mt-6">
                        <div className="w-1/2">
                            <label className="block font-semibold text-white">Gender</label>
                            <div className="mt-1">
                                {editMode ? (
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="block w-sm mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                ) : (
                                    <p className="text-white">{gender}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-1/2">
                            <label className="block font-semibold text-white">Age</label>
                            <div className="mt-1">
                                {editMode ? (
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age || ""}
                                        onChange={handleChange}
                                        className="block w-sm mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                        placeholder="Enter your age"
                                    />
                                ) : (
                                    <p className="text-white">{age || "N/A"}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white">About</h3>
                        <div className="mt-1">
                            {editMode ? (
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="block w-full mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                />
                            ) : (
                                <p className="text-white">{about}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white">Skills</h3>
                        <div className="flex flex-wrap mt-2">
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={handleSkillChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && newSkill) {
                                                handleAddSkill();
                                            }
                                        }}
                                        className="block w-full mt-2 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                        placeholder="Add a skill"
                                    />

                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center space-x-4 mt-2">
                                            <span className="badge badge-accent text-white space-x-4 mx-2 mt-1">
                                                {skill}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                skills?.map((skill, index) => (
                                    <span key={index} className="badge badge-accent m-1 space-x-4 text-white">
                                        {skill}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>

                    {editMode && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-white">Profile Picture URL</label>
                            <div className="mt-1">
                                <input
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    className="block w-full mt-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white"
                                    placeholder="Enter new photo URL"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;