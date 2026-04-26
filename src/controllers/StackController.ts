import { Request, Response } from "express";
import { stack } from "../models/instances";

export class StackController {
  public add(req: Request, res: Response): Response {
    const { item } = req.body;

    if (item === undefined || item === null) {
      return res.status(400).json({ message: "O campo item é obrigatório." });
    }

    stack.add(String(item));

    return res.status(201).json({
      message: "Item adicionado com sucesso.",
      item: String(item),
      structure: stack.name,
    });
  }

  public remove(_req: Request, res: Response): Response {
    const removedItem = stack.remove();

    if (removedItem === undefined) {
      return res.status(404).json({ message: "A pilha está vazia." });
    }

    return res.status(200).json({
      message: "Item removido com sucesso.",
      item: removedItem,
    });
  }

  public peek(_req: Request, res: Response): Response {
    const topItem = stack.peek();

    if (topItem === undefined) {
      return res.status(404).json({ message: "A pilha está vazia." });
    }

    return res.status(200).json({ topo: topItem });
  }

  public getAll(_req: Request, res: Response): Response {
    return res.status(200).json({
      id: stack.getId(),
      nome: stack.name,
      tamanho: stack.getSize(),
      itens: stack.getItems(),
    });
  }

  public clear(_req: Request, res: Response): Response {
    stack.clear();

    return res.status(200).json({ message: "Pilha limpa com sucesso." });
  }
}

export const stackController = new StackController();
