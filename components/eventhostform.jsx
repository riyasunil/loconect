'use client';
import { useState } from "react";
import api from "@/api/api";
import { useRouter } from "next/navigation";

function EventHostForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonPhone, setContactPersonPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post("/api/register/eventhost/", { 
                username, 
                password, 
                address, 
                contact_person_name: contactPersonName, 
                contact_person_phone: contactPersonPhone 
            });
            // Handle success (redirect to login or show message)
            router.push("/login");
        } catch (error) {
            alert("Error during registration: " + error);
            console.error("Error during registration:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Event Host Registration</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
            />
            <input
                type="text"
                value={contactPersonName}
                onChange={(e) => setContactPersonName(e.target.value)}
                placeholder="Contact Person Name"
            />
            <input
                type="text"
                value={contactPersonPhone}
                onChange={(e) => setContactPersonPhone(e.target.value)}
                placeholder="Contact Person Phone"
            />
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default EventHostForm;
