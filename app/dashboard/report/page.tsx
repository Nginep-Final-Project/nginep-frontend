"use client";

import React from "react";
import OverviewReport from "./_components/OverviewReport";
import EarningsByTransaction from "./_components/EarningsByTransaction";
import EarningsByProperty from "./_components/EarningsByProperty";
import { useSession } from "next-auth/react";

const Report: React.FC = () => {
  const { data: session } = useSession();
  const tenantIdString = session?.user?.id;
  const tenantId = tenantIdString ? parseInt(tenantIdString, 10) : undefined;

  if (tenantId === undefined || isNaN(tenantId)) {
    return <div>Please log in to observe your analytics and overview report</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-10">
        Hi, User! <br /> Let&apos;s observe your properties performance{" "}
      </h1>
      <OverviewReport tenantId={tenantId} />
      <EarningsByTransaction />
      <EarningsByProperty />
    </div>
  );
};

export default Report;
