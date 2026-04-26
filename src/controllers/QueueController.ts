import { Request, Response } from "express";
import { queue } from "../models/instances";

export class QueueController {
  public add(req: Request, res: Response): Response {
    const { item } = req.body;

    if (item === undefined || item === null) {
      return res.status(400).json({ message: "O campo item é obrigatório." });
    }

    queue.add(String(item));

    return res.status(201).json({
      message: "Item adicionado com sucesso.",
      item: String(item),
      structure: queue.name,
    });
  }

  public remove(_req: Request, res: Response): Response {
    const removedItem = queue.remove();

    if (removedItem === undefined) {
      return res.status(404).json({ message: "A fila está vazia." });
    }

    return res.status(200).json({
      message: "Item removido com sucesso.",
      item: removedItem,
    });
  }

  public peek(_req: Request, res: Response): Response {
    const frontItem = queue.peek();

    if (frontItem === undefined) {
      return res.status(404).json({ message: "A fila está vazia." });
    }

    return res.status(200).json({ frente: frontItem });
  }

  public getAll(_req: Request, res: Response): Response {
    return res.status(200).json({
      id: queue.getId(),
      nome: queue.name,
      tamanho: queue.getSize(),
      itens: queue.getItems(),
    });
  }

  public clear(_req: Request, res: Response): Response {
    queue.clear();

    return res.status(200).json({ message: "Fila limpa com sucesso." });
  }
}

export const queueController = new QueueController();
