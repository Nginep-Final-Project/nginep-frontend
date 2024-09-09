import type { Metadata } from "next";
import DashboardSidebar from "./_components/DashboardSidebar/DashboardSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nginep - Dashboard",
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
