import { useState } from "react";

export default function ProfileSettings() {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile & Settings</h1>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

        <div className="flex items-center space-x-6 mb-6">
          <img
            src={preview || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <label className="text-sm text-gray-600">Upload New Photo</label>
            <input
              type="file"
              className="mt-1 block"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="Street, City, Country"
            />
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      {/* PASSWORD CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Update Password
        </button>
      </div>

      {/* SECURITY SETTINGS */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Security Settings</h2>

        <div className="flex items-center justify-between mb-4 p-3 border rounded-lg">
          <span className="font-medium">Enable Two-Factor Authentication</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between mb-4 p-3 border rounded-lg">
          <span className="font-medium">Login Alerts</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Update Security
        </button>
      </div>
    </div>
  );
}
