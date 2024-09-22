import type { Metadata } from "next";
import Header from "./[roomId]/_components/Header/Header";
import ClientValidatedNavigationWrapper from "./[roomId]/_components/Navigation/ClientValidatedNavigationWrapper";

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
      <ClientValidatedNavigationWrapper>
        <Header />
        {children}
      </ClientValidatedNavigationWrapper>
    </section>
  );
}
