import { useState } from "react";
import { apiFetch } from "../utils/api";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Create a new account</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Sign up
      </button>
      <div>
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 underline-none"
        >
          Already has an account?
        </Link>
      </div>
    </form>
  );
};

export default Register;
