import React, { useState } from "react";
import { useAuth } from "../../context/Authcontext";

export default function Profile() {
  const { user, updateUser } = useAuth(); // Assume updateUser updates context
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user info in context
    updateUser({ ...formData, avatar });
    alert("Profile updated!");
  };

  return (
    <div className="p-6 bg-gray-50 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <form
        className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
              <span className="text-gray-500">Avatar</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mt-2"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
