'use client'
import { useState } from "react";
import api from "@/api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../app/constants.js";
import { useRouter } from "next/navigation";

function NuserForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0); // Additional field for age
    const [phoneNumber, setPhoneNumber] = useState(""); // Additional field for phone number
    const [location, setLocation] = useState(""); // Additional field for location
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/register/nuser/", { 
                username, 
                password,
                age,
                phone_number: phoneNumber,
                location
            });

            if (res.status === 201) {
                router.push("/login");
            }
        } catch (error) {
            alert("Error during registration: " + error.response.data.detail);
            console.error("Error during registration:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container text-black flex flex-col gap-y-2 justify-center items-center">
            <h1>Register as Nuser</h1>
            <input
                className="form-input p-2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <input
                className="form-input p-2"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                required
            />
            <input
                className="form-input p-2"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required
            />
            <input
                className="form-input p-2"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                required
            />
            <button className="form-button border border-black bg-gray-100 px-4 py-2 rounded-lg" type="submit">
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default NuserForm;
