import { JSX, ReactNode } from "react";
import { House } from "lucide-react";
import config from "./config";

// Update this variable to the last ID used in your menu items
const lastId = 0 as const;

export type MenuItem =
  | {
      type: "parent";
      title: string;
      icon: JSX.ElementType;
      id: number;
      children: {
        title: string;
        id: number;
        icon: JSX.ElementType;
        path: string;
      }[];
    }
  | {
      type: "link";
      title: string;
      icon: JSX.ElementType;
      id: number;
      path: string;
    };

class MenuUtil {
  // This will decide whether to enable role-based access or not
  static role_access_enabled = config.enable_role_based_access;

  static validateUniqueIds() {
    const usedIds = new Set<number>();
    for (const item of this.MenuItems) {
      if (usedIds.has(item.id)) {
        throw new Error(`Duplicate ID found in MenuItems: ${item.id}`);
      }
      usedIds.add(item.id);
      if (item.type == "link") continue;
      for (const child of item.children || []) {
        if (usedIds.has(child.id)) {
          throw new Error(`Duplicate ID found in child items: ${child.id}`);
        }
        usedIds.add(child.id);
      }
    }
  }

  static getMenuItems(access_role: Record<string, boolean>): MenuItem[] {
    if (!this.role_access_enabled) {
      return this.MenuItems;
    }
    const newMenuList = this.MenuItems.filter((menu) => {
      if (access_role?.[menu.id] == false) return false;
      if (menu.type == "link") return true;
      menu.children = menu.children.filter((child) => {
        return access_role?.[child.id] !== false;
      });
      return menu.children.length > 0;
    });
    return newMenuList;
  }

  static MenuItems: MenuItem[] = [
    {
      id: 0,
      title: "Dashboard",
      icon: House,
      type: "link",
      path: "/home/dashboard",
    },
    {
      id: 1,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 2,
          title: "Test",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 3,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 4,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 5,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 6,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 7,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 8,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 9,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 10,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 11,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 12,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
    {
      id: 13,
      title: "Dashboard",
      icon: House,
      type: "parent",
      children: [
        {
          id: 14,
          title: "Overview",
          icon: House,
          path: "/home/dashboard/overview",
        },
      ],
    },
  ];
}

MenuUtil.validateUniqueIds();

export default MenuUtil;
