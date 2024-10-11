'use client'
import { useState } from "react";
import api from "@/api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../app/constants.js";
import { useRouter } from "next/navigation";
// import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                router.push("/")
            } else {
                router.push("/login")
            }
        } catch (error) {
            alert(error)
            console.error("Error during login:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container text-black flex flex-col gap-y-2 justify-center items-center">
            <h1>{name}</h1>
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
            {/* {loading && <LoadingIndicator />} */}
            <button className="form-button border border-black bg-gray-100 px-4 py-2 rounded-lg" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form