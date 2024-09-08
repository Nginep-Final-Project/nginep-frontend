import React from "react";
import Link from "next/link";
import { MenuItem as MenuItemType } from "@/data/dashboardSidebarMenuItems";

interface SubMenuItemProps {
  subItem: MenuItemType;
  isExpanded: boolean;
  isActive: (item: MenuItemType) => boolean;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  subItem,
  isExpanded,
  isActive,
}) => {
  return (
    <Link
      href={subItem.href}
      className={`flex ${
        isExpanded ? "" : "justify-center"
      } items-center p-2 hover:bg-pink-50 ${
        isActive(subItem) ? "bg-pink-100 text-primary" : ""
      }`}
    >
      <subItem.icon
        size={16}
        className={`text-primary ${isExpanded ? "mr-2" : ""}`}
      />
      {isExpanded && <span>{subItem.label}</span>}
    </Link>
  );
};

export default SubMenuItem;
