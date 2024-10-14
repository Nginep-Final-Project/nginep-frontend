import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Nginep - User",
  description:
    "The user profile, booking list, and settings.",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
