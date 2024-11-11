import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("accessToken", response.access_token);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex items-center relative justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto bg-white p-8 border border-gray-300 shadow-md rounded"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value), setError(null) }}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value), setError(null) }}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="w-full mb-4 bg-teal-400 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-200"
        >
          Sign in
        </button>
        <div className="flex items-center space-x-1">
          <p>Need an account?</p>
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 underline-none"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
