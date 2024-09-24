import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Dashboard Reviews",
  description:
    "The dashboard for tenant managements on reviews of properties",
};

export default function Review({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
