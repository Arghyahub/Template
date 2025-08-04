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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

function OnMobile() {
  if (Util.isOnServer()) return false;
  return window.innerWidth < 768;
}

type MenuListState = MenuItem & { is_open?: boolean };

const MobileSidebar = (props: Props) => {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(OnMobile() ? false : true);
  const user = useUserStore((state) => state.user);
  const [MenuListState, setMenuListState] = useState<MenuListState[]>([]);

  useEffect(() => {
    if (!user.id) return setMenuListState([]);
    const newMenuList = MenuList.getMenuItems(user.access_role);
    setMenuListState(newMenuList);
  }, [user]);

  return (
    <div className="flex flex-row items-start">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="bg-teal-500 opacity-65 mt-12 py-4 rounded-r-md"
      >
        <ChevronRight className="size-5 text-white" />
      </button>
      <Sheet open={IsSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[250px]">
          <SheetHeader className="p-0">
            <SheetTitle className="hidden">Sidebar</SheetTitle>
            {/* <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
          </SheetHeader>
          <div
            className={cn(
              "flex flex-col items-center gap-4 px-2 pr-2 pl-3 w-[220px]  h-full"
            )}
          >
            <div
              className={cn("flex flex-row items-center justify-center w-full")}
            >
              {/* <div className="w-1/3"></div> */}
              <div
                className={cn(
                  "flex flex-col items-center gap-2 pb-4 border-b-4"
                )}
              >
                <Image src={config.logo} alt="Logo" width={50} height={50} />
                <h1 className="text-lg">{config.title}</h1>
              </div>

              {/* <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className={cn(
            "bg-teal-500 hover:bg-teal-600 ml-auto p-1 rounded-full text-white text-center transition cursor-pointer"
          )}
        >
          {IsSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button> */}
            </div>

            <div className="flex flex-col gap-2 pb-8 w-full h-full overflow-y-scroll no-scrollbar">
              {MenuListState.map((menu) => (
                <div key={menu.id} className="flex flex-col gap-2 w-full">
                  {menu.type === "link" ? (
                    <>
                      <Link
                        href={menu.path}
                        data-tooltip-id={`${menu.id}`}
                        data-tooltip-content={menu.title}
                        className={cn(
                          "flex flex-row items-center gap-2 px-3 py-3 hover:bg-teal-100 rounded-md hover:text-teal-800 transition duration-400 cursor-pointer"
                        )}
                      >
                        <menu.icon className="size-5" />
                        <div className="flex-1">{menu.title}</div>
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
                              m.id === menu.id
                                ? { ...m, is_open: !m.is_open }
                                : m
                            )
                          );
                        }}
                        className={cn(
                          "flex flex-row px-3 py-[14px] gap-2 items-center hover:bg-teal-100  rounded-md hover:text-teal-800 transition duration-400 cursor-pointer"
                        )}
                      >
                        <menu.icon className="size-5" />
                        <div className="">{menu.title}</div>
                        <ChevronDown className="ml-auto size-5" />
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
                            "flex flex-row items-center gap-2 px-5 py-3 pl-11 hover:bg-cyan-100 rounded-md hover:text-cyan-800 transition duration-400 cursor-pointer"
                          )}
                        >
                          {/* {!IsSidebarOpen && <child.icon className="size-5" />} */}

                          <div className="flex-1">{child.title}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
