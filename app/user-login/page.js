"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";

export default function NormalUserLogin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            router.push("/");
        } catch (error) {
            alert("Error during login. Please check your credentials.");
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="form-container text-black flex flex-col gap-y-2 justify-center items-center">
                <h1>Normal User Login</h1>
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
                <button className="form-button border border-black bg-gray-100 px-4 py-2 rounded-lg" type="submit">
                    Login
                </button>
                {loading && <p>Loading...</p>}
            </form>
        </div>
    );
}
