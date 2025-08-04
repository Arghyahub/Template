"use client";
import useGlobalStore from "@/app/store/global-store";
import Api from "@/utils/api";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import SplashScreen from "./splash-screen";
import useUserStore from "@/app/store/user-store";
import User from "@/types/entities/user";
type Props = {
  children: React.ReactNode;
};

interface fullRefreshPayload {
  accessToken: string;
  user: User;
}

const Protected = ({ children }: Props) => {
  const setAccessToken = useGlobalStore((state) => state.setAccessToken);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

  async function checkAuth() {
    try {
      const res = await Api.get("/auth/refresh/full-data");
      if (res.status == 200) {
        const payload: fullRefreshPayload = res.data.payload;
        if (payload) {
          setAccessToken(payload.accessToken);
          setUser(payload.user);
        }
      } else {
        toast.error(
          res.data.message || "Authentication failed. Please log in again."
        );
        router.replace("/auth/login");
      }
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

  return <>{user?.id ? <>{children}</> : <SplashScreen />}</>;
};

export default Protected;
