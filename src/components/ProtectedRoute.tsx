"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sessionStatus = localStorage.getItem("sessionStatus");
    if (sessionStatus !== "true") {
      router.push("/"); // Redirect to login page if not authenticated
    } else {
      setIsLoading(false); // Allow rendering if authenticated
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="loader"></div>
      </div>
    ); // Show a loading state while checking authentication
  }

  return <>{children}</>;
};

export default ProtectedRoute;
