import { apiRequest } from "./api";
import type {
  ListIndexResponse,
  ListPeekResponse,
  ListRemoveIndexResponse,
  MessageResponse,
  StructureData,
} from "../types/api";

export const listService = {
  getAll: () => apiRequest<StructureData>("/lista"),
  add: (item: string) => apiRequest<MessageResponse>("/lista", { method: "POST", body: { item } }),
  remove: () => apiRequest<MessageResponse>("/lista", { method: "DELETE" }),
  peek: () => apiRequest<ListPeekResponse>("/lista/ultimo"),
  getAt: (index: number) => apiRequest<ListIndexResponse>(`/lista/${index}`),
  removeAt: (index: number) => apiRequest<ListRemoveIndexResponse>(`/lista/${index}`, { method: "DELETE" }),
  clear: () => apiRequest<MessageResponse>("/lista/limpar", { method: "DELETE" }),
};
