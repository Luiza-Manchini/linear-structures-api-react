import { Navigate, Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage";
import QueuePage from "../pages/QueuePage";
import StackPage from "../pages/StackPage";

interface AppRoutesProps {
  onStatsChange: () => Promise<void>;
}

export default function AppRoutes({ onStatsChange }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pilha" replace />} />
      <Route path="/pilha" element={<StackPage onStatsChange={onStatsChange} />} />
      <Route path="/fila" element={<QueuePage onStatsChange={onStatsChange} />} />
      <Route path="/lista" element={<ListPage onStatsChange={onStatsChange} />} />
    </Routes>
  );
}
