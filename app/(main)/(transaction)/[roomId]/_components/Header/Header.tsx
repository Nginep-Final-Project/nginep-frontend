"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NginepLogo from "@/public/logos/nginep-logo.svg";
import { BookingData } from "@/types/bookingData";
import ValidatedNavigation from "../Navigation/ValidatedNavigation";

type NavItem = {
  label: string;
  href: string;
  requiredFields: (keyof BookingData)[];
};

const navItems: NavItem[] = [
  { label: "Booking Summary", href: "/booking-summary", requiredFields: [] },
  {
    label: "Payment Method",
    href: "/payment-method",
    requiredFields: ["checkIn", "checkOut", "guestCount"],
  },
  {
    label: "Payment Process",
    href: "/payment-process",
    requiredFields: ["checkIn", "checkOut", "guestCount", "paymentMethod"],
  },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  const activeNavItems = useMemo(() => {
    return navItems.map((item) => ({
      ...item,
      isActive: pathname.endsWith(item.href),
    }));
  }, [pathname]);

  return (
    <header className="shadow-md">
      <div className="container flex items-center p-2 sm:py-4 sm:px-6">
        <Link href="/" className="flex-shrink-0 mr-10">
          <div className="flex items-center">
            <Image src={NginepLogo} alt="Logo" width={100} height={100} />
          </div>
        </Link>
        <nav className="flex-grow overflow-x-auto custom-tiny-scrollbar">
          <ul className="flex whitespace-nowrap">
            {activeNavItems.map((item, index) => (
              <li
                key={index}
                className="flex-shrink-0 mr-6 md:mr-10 lg:mr-16 last:mr-0"
              >
                <ValidatedNavigation
                  to={item.href}
                  requiredFields={item.requiredFields}
                  useRoomId={true}
                >
                  <div
                    className={`text-base hover:text-gray-950 transition duration-300 ease-in-out
                        ${
                          item.isActive
                            ? "font-bold text-gray-700"
                            : "text-gray-400"
                        }`}
                  >
                    {item.label}
                  </div>
                </ValidatedNavigation>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
