import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const goHome = () => {
    // if (role === "ADMIN") {
    //   navigate("/admin-panel");
    // } else {
    navigate("/");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Illustration / Icon */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
          <span className="text-5xl font-bold text-blue-600">404</span>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={goHome}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-sm text-gray-400">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
