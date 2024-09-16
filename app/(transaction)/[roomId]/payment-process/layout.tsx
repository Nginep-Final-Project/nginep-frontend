import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Payment Process",
  description: "Summary for the payment process",
};

export default function PaymentProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}