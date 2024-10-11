'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Signup from "./signup/page";
import HomePage from "@/components/home";
import ProtectedRoutes from "@/components/protectedRoutes";

// function Logout(){
//   const router = useRouter();
//   localStorage.clear()
//   return <Signup />
// }

// function RegisterAndLogout(){
//   // clearning so that we dont accidentaly send the old access tokens lying around to the register component
//   localStorage.clear()
//   return <Signup />
// }
export default function MainPage() {
  return (
    <ProtectedRoutes>
      <HomePage />
    </ProtectedRoutes>
  );
}
