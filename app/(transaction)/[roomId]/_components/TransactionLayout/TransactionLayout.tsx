import React from "react";

interface TransactionLayoutProps {
  children: React.ReactNode;
  title: string;
}

const TransactionLayout: React.FC<TransactionLayoutProps> = ({
  children,
  title,
}) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    <div className="flex flex-col-reverse lg:flex-row gap-8">{children}</div>
  </div>
);

export default TransactionLayout;
