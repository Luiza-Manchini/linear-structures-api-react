export interface StructureData {
  id: number;
  nome: string;
  tamanho: number;
  itens: string[];
}

export interface StatsStructure {
  id: number;
  nome: string;
  tamanho: number;
}

export interface StatsResponse {
  totalEstruturasCriadas: number;
  estruturas: {
    pilha: StatsStructure;
    fila: StatsStructure;
    lista: StatsStructure;
  };
}

export interface MessageResponse {
  message: string;
}

export interface StackPeekResponse {
  topo: string;
}

export interface QueuePeekResponse {
  frente: string;
}

export interface ListPeekResponse {
  ultimo: string;
}

export interface ListIndexResponse {
  indice: number;
  item: string;
}

export interface ListRemoveIndexResponse {
  indice: number;
  removido: string;
}
