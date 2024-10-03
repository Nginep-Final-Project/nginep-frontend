import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Dashboard Analytics",
  description:
    "The dashboard for insights and analytics",
};

export default function Report({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
