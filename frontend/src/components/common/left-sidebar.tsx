"use client";
import useUserStore from "@/app/store/user-store";
import config from "@/config/config";
import MenuList, { MenuItem } from "@/config/menu-list";
import { cn } from "@/lib/utils";
import Util from "@/utils/util";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";

type Props = {};

function OnMobile() {
  if (Util.isOnServer()) return false;
  return window.innerWidth < 768;
}

type MenuListState = MenuItem & { is_open?: boolean };

const LeftSidebar = (props: Props) => {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(OnMobile() ? false : true);
  const user = useUserStore((state) => state.user);
  const [MenuListState, setMenuListState] = useState<MenuListState[]>([]);

  useEffect(() => {
    if (!user.id) return setMenuListState([]);
    const newMenuList = MenuList.getMenuItems(user.access_role);
    setMenuListState(newMenuList);
  }, [user]);

  const tooltipIds = useMemo(() => {
    return MenuListState.reduce<string[]>((acc, menu) => {
      acc.push(`${menu.id}`);
      if (menu.type === "parent" && menu.children) {
        menu.children.forEach((child) => acc.push(`${child.id}`));
      }
      return acc;
    }, []);
  }, [MenuListState]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 px-3 py-2 border-r-2  h-full",
        IsSidebarOpen ? "w-[250px]" : "w-[70px]"
      )}
    >
      <div
        className={cn(
          "flex flex-row items-center w-full",
          IsSidebarOpen ? "" : "flex-col-reverse"
        )}
      >
        {IsSidebarOpen && <div className="w-1/4"></div>}
        <div
          className={cn(
            "flex flex-col items-center gap-2 pb-4 border-b-4",
            IsSidebarOpen ? "px-2 pt-2" : "mt-2"
          )}
        >
          <Image
            src={config.logo}
            alt="Logo"
            width={70}
            height={70}
            className={cn(IsSidebarOpen ? "" : "size-14")}
          />
          <h1 className={cn("text-xl", IsSidebarOpen ? "" : "text-base")}>
            {config.title}
          </h1>
        </div>

        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className={cn(
            "bg-teal-500 hover:bg-teal-600 p-1 rounded-full text-white text-center transition cursor-pointer",
            IsSidebarOpen ? "ml-auto" : "mt-4"
          )}
        >
          {IsSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-4 w-full h-full overflow-y-scroll no-scrollbar">
        {MenuListState.map((menu) => (
          <div key={menu.id} className="flex flex-col gap-2 w-full">
            {menu.type === "link" ? (
              <>
                <Link
                  href={menu.path}
                  data-tooltip-id={`${menu.id}`}
                  data-tooltip-content={menu.title}
                  className={cn(
                    "flex flex-row items-center gap-2 hover:bg-teal-100 rounded-md hover:text-teal-800 transition duration-400 cursor-pointer",
                    IsSidebarOpen ? "px-5 py-4" : "justify-center py-2"
                  )}
                >
                  <menu.icon className="size-5" />
                  {IsSidebarOpen && <div className="flex-1">{menu.title}</div>}
                </Link>
              </>
            ) : (
              <>
                <button
                  data-tooltip-id={`${menu.id}`}
                  data-tooltip-content={menu.title}
                  onClick={() => {
                    setMenuListState((prev) =>
                      prev.map((m) =>
                        m.id === menu.id ? { ...m, is_open: !m.is_open } : m
                      )
                    );
                  }}
                  className={cn(
                    "flex flex-row items-center hover:bg-teal-100  rounded-md hover:text-teal-800 transition duration-400 cursor-pointer",
                    IsSidebarOpen ? "px-5 py-4 gap-2" : "justify-center py-2"
                  )}
                >
                  <menu.icon
                    className={cn("size-5", IsSidebarOpen ? "" : "ml-3")}
                  />
                  {IsSidebarOpen && <div className="">{menu.title}</div>}
                  <ChevronDown
                    className={cn(IsSidebarOpen ? "ml-auto size-5" : "size-3")}
                  />
                </button>
              </>
            )}
            {menu.is_open && menu.type == "parent" && (
              <div className="flex flex-col gap-2 w-full animate-fade-elongate">
                {menu.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.path}
                    data-tooltip-id={`${child.id}`}
                    data-tooltip-content={child.title}
                    className={cn(
                      "flex flex-row items-center gap-2 hover:bg-cyan-100 rounded-md hover:text-cyan-800 transition duration-400 cursor-pointer",
                      IsSidebarOpen ? "px-5 py-4 pl-12" : "justify-center py-2"
                    )}
                  >
                    {!IsSidebarOpen && <child.icon className="size-5" />}
                    {IsSidebarOpen && (
                      <div className="flex-1">{child.title}</div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {tooltipIds.map((id) => (
        <Tooltip
          key={id}
          id={id}
          place="right"
          style={{
            color: "white",
            background: "teal",
            fontSize: "0.7rem",
            padding: "0.2rem 0.4rem",
            maxWidth: "200px",
            ...(!IsSidebarOpen ? {} : { display: "none" }),
          }}
        />
      ))}
    </div>
  );
};

export default LeftSidebar;
