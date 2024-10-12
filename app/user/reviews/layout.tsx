import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - User Reviews",
  description:
    "The list for user reviews.",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
