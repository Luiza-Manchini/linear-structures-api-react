import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { getStats } from "./services/statsService";
import type { StatsResponse } from "./types/api";

export default function App() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [statsError, setStatsError] = useState("");

  const refreshStats = async () => {
    try {
      const nextStats = await getStats();
      setStats(nextStats);
      setStatsError("");
    } catch (error) {
      setStatsError(error instanceof Error ? error.message : "Nao foi possivel carregar as estatisticas.");
    }
  };

  useEffect(() => {
    void refreshStats();
  }, []);

  return (
    <div className="app-shell">
      <Navbar stats={stats} error={statsError} />
      <main className="page-shell">
        <AppRoutes onStatsChange={refreshStats} />
      </main>
    </div>
  );
}
