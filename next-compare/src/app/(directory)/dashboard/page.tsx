import DashboardView from "@/app/(directory)/dashboard/dashboard-view/dashboard-view";
import { UserContextProvider } from "@/components/context/user-context/user-context";

export default function Dashboard() {
  return (
    <UserContextProvider>
      <DashboardView />
    </UserContextProvider>
  );
}
