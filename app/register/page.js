"use client";
import { useEffect } from "react";
import Signup from "../signup/page";

export default function RegisterPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Signup />;
}
