import type { Metadata } from "next";
// import ClientValidatedNavigationWrapper from "./[roomId]/_components/Navigation/ClientValidatedNavigationWrapper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nginep - Reservation Summary",
  description:
    "The reservation or booking summary for guests number, nights, and price",
};

export default function Transaction({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <ClientValidatedNavigationWrapper> */}
        <Navbar />
        {children}
        <Footer />
      {/* </ClientValidatedNavigationWrapper> */}
    </section>
  );
}
