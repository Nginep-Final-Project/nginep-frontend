import React from "react";
import { ChevronRight } from "lucide-react";
import SubMenuItem from "./SubMenuItem";
import { MenuItem as MenuItemType } from "@/data/dashboardSidebarMenuItems";

interface MenuItemProps {
  item: MenuItemType;
  isExpanded: boolean;
  isActive: (item: MenuItemType) => boolean;
  expandedItems: string[];
  toggleMenuItem: (label: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isExpanded,
  isActive,
  expandedItems,
  toggleMenuItem,
}) => {
  return (
    <div className="space-y-2 mb-2">
      <button
        onClick={() => toggleMenuItem(item.label)}
        className={`w-full flex items-center p-4 hover:bg-pink-50 relative ${
          isActive(item) ? "bg-pink-100 text-primary" : ""
        }`}
      >
        <div className={`${!isExpanded ? "mx-auto" : ""}`}>
          <item.icon
            size={24}
            className={`text-primary ${isExpanded ? "mr-4" : ""}`}
          />
        </div>
        {isExpanded && (
          <>
            <span className="flex-grow text-left">{item.label}</span>
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${
                expandedItems.includes(item.label) ? "rotate-90" : ""
              }`}
            />
          </>
        )}
        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-primary"></div>
      </button>
      {expandedItems.includes(item.label) && item.subItems && (
        <div className={`space-y-2 ${isExpanded ? "ml-8" : "ml-0"}`}>
          {item.subItems.map((subItem, subIndex) => (
            <SubMenuItem
              key={subIndex}
              subItem={subItem}
              isExpanded={isExpanded}
              isActive={isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
