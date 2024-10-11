"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function EventHostRegister() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/event-host/register/", {
        username,
        password,
        organization_name: organizationName,
        website,
        social_media_links: socialMediaLinks,
      });
      router.push("/login/event-host");
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
        <h1>Event Host Registration</h1>
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
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          placeholder="Organization Name"
        />
        <input
          className="form-input p-2"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website"
        />
        <input
          className="form-input p-2"
          type="text"
          value={socialMediaLinks}
          onChange={(e) => setSocialMediaLinks(e.target.value)}
          placeholder="Social Media Links"
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
