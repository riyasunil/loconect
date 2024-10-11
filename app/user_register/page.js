"use client";
// app/register/NormalUserRegister.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function NormalUserRegister() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/register/", {
        username,
        password,
        contact,
        location,
        bio,
      });
      router.push("/");
    } catch (error) {
      alert("Error during registration. Please try again.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-container text-black flex flex-col gap-y-2 justify-center items-center"
      >
        <h1>Normal User Registration</h1>
        <input
          className="form-input p-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="form-input p-2"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact"
        />
        <input
          className="form-input p-2"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <input
          className="form-input p-2"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <button
          className="form-button border border-black bg-gray-100 px-4 py-2 rounded-lg"
          type="submit"
        >
          Register
        </button>
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}
