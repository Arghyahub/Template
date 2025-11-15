"use client";
import Loader from "@/components/common/loader";
import Api from "@/utils/api";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useUserStore from "../../store/user-store";
import Util from "@/utils/util";

type Props = {};

// Page 0
const page = (props: Props) => {
  const User = useUserStore((state) => state.user);
  const permission = useUserStore((state) => state.getRolePermissions(0));

  useEffect(() => {
    if (!permission?.access) {
      Util.logout();
      return;
    }
  }, []);

  // if (IsLoading) {
  //   return <Loader />;
  // }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Dashboard</h1>
      {permission?.super_admin && (
        <p>If you are super admin and you have access then you can see it</p>
      )}
      {permission?.manager && (
        <p>If you are manager and you have access then you can see it</p>
      )}
      {permission?.employee && (
        <p>If you are employee and you have access then you can see it</p>
      )}
    </div>
  );
};

export default page;
