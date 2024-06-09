"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";



function Register() {
  const router = useRouter()
  const {data: session, status: sessionStatus} = useSession();

  useEffect(() => {
    if(sessionStatus === "authenticated") {
      router.push("/dashboard")
    }
  },[sessionStatus,router])
  return (
    sessionStatus !== "authenticated" && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">
            Register
          </h2>
        </div>
      </div>
    )
  )
}

export default Register