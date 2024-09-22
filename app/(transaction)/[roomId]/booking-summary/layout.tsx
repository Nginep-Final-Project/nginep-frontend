import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Booking Summary",
  description:
    "The booking summary for guests number, nights, and price",
};

export default function BookingSummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
