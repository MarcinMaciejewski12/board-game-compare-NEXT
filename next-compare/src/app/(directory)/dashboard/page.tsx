import DashboardView from "@/app/(directory)/dashboard/dashboard-view/dashboard-view";

export interface Games {
  createdAt: string;
  difficulty: number;
  game_name: string;
  game_score_board: string;
  id: string;
  is_shared_to_community: boolean;
  max_players: number;
  min_players: number;
  photo: string;
  playtime: string;
  unique_board_id: string;
  user_id: string;
  description?: string | null;
}

export default function Dashboard() {
  return <DashboardView />;
}
