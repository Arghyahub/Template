"use client";
import useGlobalStore from "@/stores/global-store";
import Api from "@/utils/api";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const [IsLoading, setIsLoading] = useState(true);
  const setRefreshToken = useGlobalStore((state) => state.setRefreshToken);

  async function checkAuth() {
    try {
    } catch (error) {
      console.error("Error checking authentication:", error);
      toast.error("Authentication failed. Please log in again.");
      redirect("/login");
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default Protected;
