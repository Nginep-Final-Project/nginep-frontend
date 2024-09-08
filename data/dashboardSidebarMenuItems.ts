import {
  Home,
  PlusCircle,
  Tag,
  Coffee,
  MessageSquare,
  CircleDollarSign,
  CalendarDays,
  ScrollText,
  ClipboardList,
  ChartLine,
} from "lucide-react";

export interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: "Property Management",
    href: "#",
    subItems: [
      {
        icon: Home,
        label: "List of Properties",
        href: "/dashboard/property-list",
      },
      {
        icon: PlusCircle,
        label: "Create Property",
        href: "/dashboard/property/create",
      },
      { icon: Tag, label: "Add New Category", href: "/dashboard/category" },
      { icon: Coffee, label: "Add New Facility", href: "/dashboard/facility" },
    ],
  },
  {
    icon: ClipboardList,
    label: "Booking Management",
    href: "#",
    subItems: [
      {
        icon: ScrollText,
        label: "List of Bookings",
        href: "/dashboard/booking-list",
      },
      {
        icon: MessageSquare,
        label: "Response to Reviews",
        href: "/dashboard/review",
      },
    ],
  },
  {
    icon: ChartLine,
    label: "Insight and Analysis",
    href: "#",
    subItems: [
      { icon: CircleDollarSign, label: "Earnings", href: "/dashboard/report" },
      {
        icon: CalendarDays,
        label: "Calendar for Booked Properties",
        href: "/dashboard/calendar",
      },
    ],
  },
];
