"use client";
import {jwtDecode} from "jwt-decode"
import api from "@/api/api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/app/constants"
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';


const ProtectedRoutes = ({children}) => {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState(null)

    useEffect(() => {
        auth().catch(() => isAuthed(false))
    }, [])
    useEffect(() => {
        if (isAuthed === false) {
          router.push("/login");
        }
      }, [isAuthed, router]);

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh : refreshToken
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.ACCESS_TOKEN)
                setIsAuthed(true)
            }else{
                setIsAuthed(false)
            }
        }catch(err){
            console.log(err)
            setIsAuthed(false);
        }
    }

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthed(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenexp = decoded.exp
        const now = Date.now /1000 
        // time in secs

        if(tokenexp<now){
            await refreshToken()
        }else{
            setIsAuthed(true)
        }
    }

    if ((isAuthed) === null){
        return <div>Loading...</div>
    }
  return isAuthed? children : null;
}

export default ProtectedRoutes