import { useEffect, useState } from "react";
import { AxiosClient } from "../../api/axiosClient";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "Admin" },
    { id: 2, name: "Anita Patel", email: "anita@gmail.com", role: "User" },
    { id: 3, name: "Vikas Mehta", email: "vikas@gmail.com", role: "Manager" },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "USER",
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  /* ------------------ Search ------------------ */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ------------------ Modal ------------------ */
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentUser({ id: null, name: "", email: "", role: "User" });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* ------------------ Save User ------------------ */
  const handleSave = () => {
    if (!currentUser.name || !currentUser.email) {
      alert("Name and Email are required");
      return;
    }

    if (isEdit) {
      setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }

    closeModal();
  };

  /* ------------------ Delete ------------------ */
  const handleDelete = (id) => {
    // open Tailwind confirm modal
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete != null) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
    }
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient("users", "get", null, true);
      if (res) {
        setUsersList(res.users);
      } else {
        setError(res?.message || "No users found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={openAddModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 border rounded-lg w-full sm:w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* User Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit User" : "Add User"}
            </h2>

            {/* Name */}
            <div className="mb-3">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-1"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded-lg mt-1"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg mt-1"
                placeholder="+91 98765 43210"
                value={currentUser.phone}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, phone: e.target.value })
                }
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="text-sm font-medium">Address</label>
              <textarea
                className="w-full border p-2 rounded-lg mt-1"
                rows="2"
                value={currentUser.address}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, address: e.target.value })
                }
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="text-sm font-medium">Role</label>
              <select
                className="w-full border p-2 rounded-lg mt-1"
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="USER">USER</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {users.find((u) => u.id === userToDelete)?.name || "this user"}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
