import { apiRequest } from "./api";
import type { MessageResponse, QueuePeekResponse, StructureData } from "../types/api";

export const queueService = {
  getAll: () => apiRequest<StructureData>("/fila"),
  add: (item: string) => apiRequest<MessageResponse>("/fila", { method: "POST", body: { item } }),
  remove: () => apiRequest<MessageResponse>("/fila", { method: "DELETE" }),
  peek: () => apiRequest<QueuePeekResponse>("/fila/frente"),
  clear: () => apiRequest<MessageResponse>("/fila/limpar", { method: "DELETE" }),
};
