import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nginep - Payment Method",
  description: "To choose the payment methods",
};

export default function PaymentMethodLayout({
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