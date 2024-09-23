import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Dashboard Booking List",
  description:
    "The dashboard for tenant managements on properties and bookings",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
