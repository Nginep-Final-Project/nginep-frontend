import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nginep - User Bookings",
  description:
    "The list for user bookings.",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
