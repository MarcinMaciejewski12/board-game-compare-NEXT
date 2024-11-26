import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";
import CardTable from "@/components/views/card-table";
import React from "react";

interface DashboardViewProps {
  data: Games[];
}
const DashboardView = React.memo(function DashboardView({
  data,
}: DashboardViewProps) {
  return <CardTable<Games> data={data} isDashboard={true} />;
});

export default DashboardView;
