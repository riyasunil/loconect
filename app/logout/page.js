"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    router.push("/login");
  }, [router]);

  return <div>Logging out...</div>;
}
