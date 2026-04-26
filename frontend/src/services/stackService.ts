import { apiRequest } from "./api";
import type { MessageResponse, StackPeekResponse, StructureData } from "../types/api";

export const stackService = {
  getAll: () => apiRequest<StructureData>("/pilha"),
  add: (item: string) => apiRequest<MessageResponse>("/pilha", { method: "POST", body: { item } }),
  remove: () => apiRequest<MessageResponse>("/pilha", { method: "DELETE" }),
  peek: () => apiRequest<StackPeekResponse>("/pilha/topo"),
  clear: () => apiRequest<MessageResponse>("/pilha/limpar", { method: "DELETE" }),
};
