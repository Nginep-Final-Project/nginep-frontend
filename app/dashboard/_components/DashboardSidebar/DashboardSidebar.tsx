"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, Menu } from "lucide-react";
import { menuItems, MenuItem as MenuItemType } from "@/data/dashboardSidebarMenuItems";
import MenuItem from "./MenuItem";

interface DashboardSidebarProps {
  children: React.ReactNode;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const toggleMenuItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (item: MenuItemType): boolean => {
    if (item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.href);
    }
    return pathname === item.href;
  };

  return (
    <div className="flex">
      <div
        className={`min-h-screen border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isExpanded ? "w-72" : "w-16"}`}
      >
        <div className="sticky top-0">
          <div className={`z-10 ${isExpanded ? "p-4" : "p-2"}`}>
            <div className="flex items-center justify-between">
              {isExpanded && (
                <div className="text-xl font-semibold">Dashboard</div>
              )}
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-full hover:bg-pink-50 text-primary ${
                  !isExpanded ? "mx-auto" : ""
                }`}
              >
                {isExpanded ? <ChevronLeft size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          <nav className="mt-4">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isExpanded={isExpanded}
                isActive={isActive}
                expandedItems={expandedItems}
                toggleMenuItem={toggleMenuItem}
              />
            ))}
          </nav>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default DashboardSidebar;
