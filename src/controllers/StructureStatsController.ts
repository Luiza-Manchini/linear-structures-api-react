import { Request, Response } from "express";
import { LinearStructure } from "../models/LinearStructure";
import { list, queue, stack } from "../models/instances";

export class StructureStatsController {
  public getStats(_req: Request, res: Response): Response {
    return res.status(200).json({
      totalEstruturasCriadas: LinearStructure.getCreatedStructures(),
      estruturas: {
        pilha: {
          id: stack.getId(),
          nome: stack.name,
          tamanho: stack.getSize(),
        },
        fila: {
          id: queue.getId(),
          nome: queue.name,
          tamanho: queue.getSize(),
        },
        lista: {
          id: list.getId(),
          nome: list.name,
          tamanho: list.getSize(),
        },
      },
    });
  }
}

export const structureStatsController = new StructureStatsController();
