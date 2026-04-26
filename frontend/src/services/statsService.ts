import { apiRequest } from "./api";
import type { StatsResponse } from "../types/api";

export function getStats() {
  return apiRequest<StatsResponse>("/estatisticas");
}
