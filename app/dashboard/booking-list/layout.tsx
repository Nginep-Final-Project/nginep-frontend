import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSidebar from "../_components/DashboardSidebar/DashboardSidebar";

export const metadata: Metadata = {
  title: "Nginep - Dashboard Booking List",
  description:
    "The dashboard for tenant managements on properties and bookings",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <DashboardSidebar>{children}</DashboardSidebar>
      <Footer />
    </div>
  );
}
