"use client";
import Loader from "@/components/common/loader";
import Api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const page = (props: Props) => {
  const [IsPageLoading, setIsPageLoading] = useState(false);

  const router = useRouter();

  async function getList() {
    try {
      setIsPageLoading(true);
      const res = await Api.get("/admin/role/");

      if (res.status == 200) {
        const payload = res.data.payload;
        console.log("Roles List:", payload);
      }
      if (res.status == 401) {
        toast.error("Unauthorized");
        router.push("/login");
      } else {
        toast.error(res.data.message || "Failed to fetch list");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Failed to fetch list");
    } finally {
      setIsPageLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  if (IsPageLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="font-semibold text-2xl">Roles</h1>
    </div>
  );
};

export default page;
