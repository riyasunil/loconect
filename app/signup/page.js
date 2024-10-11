import Form from "@/components/form";
import React from "react";

export default function Signup(){
    return(
        <div className="h-screen flex justify-center items-center bg-white">
            {/* <SignupComp /> */}
            <Form route="/api/user/register/" method="register"/>
        </div>
        
    )
}