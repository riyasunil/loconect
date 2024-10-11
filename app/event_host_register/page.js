"use client";
import EventHostForm from "@/components/EventHostForm";
import { useEffect } from "react";

export default function NuserRegisterPage() {
    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center bg-white">
            <EventHostForm />
        </div>
    );
}
