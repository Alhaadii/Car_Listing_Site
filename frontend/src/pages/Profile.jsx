import React, { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { set } from "mongoose";

const Profile = () => {
  const {
    currentUser,
    signInStart,
    signInSuccess,
    handleSignOut,
    loading,
    signInFailure,
  } = useAppContext();
  const { user } = currentUser;
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [imageLoading, setImageLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleFileChange = async (event) => {
    setImageLoading(true);
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please select an image file.");
      setImageLoading(false);
      return;
    }
    toast.info("Uploading image...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "car-listing-site");
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.secure_url) {
      setImageUrl(data.secure_url);
      setUpdatedData((prev) => ({ ...prev, avatar: data.secure_url }));
    } else {
      toast.error("Failed to upload image. Please try again.");
      return; // Redirect if upload fails
    }
    setImageLoading(false);
    toast.success("Image uploaded successfully!");
  };

  const handleChange = (e) => {
    setUpdatedData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      signInStart();
      const response = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (data.status) {
        toast.success("Profile updated successfully!");
        // Update current user in context
        signInSuccess(data);
      } else {
        toast.error(data.message || "Failed to update profile.");
        signInFailure(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
      signInFailure(error.message);
      return;
    }
  };

  const handleDeleteProfile = async () => {
    try {
      signInStart();
      await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      toast.success("Profile deleted successfully!");
      handleSignOut();
    } catch (error) {
      toast.error("Failed to delete profile. Please try again.");
      signInFailure(error.message);
    }
  };

  const handleLogoutProfile = async () => {
    try {
      signInStart();
      await fetch(`/api/auth/logout`, {
        method: "POST",
      });
      toast.success("Logged out successfully!");
      handleSignOut();
      // Redirect to home or login page
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      signInFailure(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg mx-auto p-4 ">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="mt-2">Details about the user will be displayed here.</p>
      <form className="mt-4 w-full">
        <input
          type="file"
          onChange={handleFileChange}
          hidden
          ref={fileInputRef}
        />
        <img
          src={imageUrl && imageUrl}
          alt="User Avatar"
          className="w-32 h-32 rounded-full cursor-pointer mx-auto mb-4"
          onClick={() => fileInputRef.current.click()}
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            defaultValue={user.username}
            onChange={handleChange}
            id="username"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 "
            placeholder="Enter your username"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            defaultValue={user.email}
            onChange={handleChange}
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            onChange={handleChange}
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 "
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          onClick={handleUpdateProfile}
          disabled={loading || imageLoading}
          className="cursor-pointer mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
      <div className="mt-4 flex justify-between items-center w-full space-x-2 ">
        <button
          type="button"
          onClick={handleDeleteProfile}
          className="cursor-pointer w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
        >
          Delete Account
        </button>
        <button
          type="button"
          onClick={handleLogoutProfile}
          className="w-full cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
