import { Request, Response } from "express";
import { list } from "../models/instances";

export class ListController {
  public add(req: Request, res: Response): Response {
    const { item } = req.body;

    if (item === undefined || item === null) {
      return res.status(400).json({ message: "O campo item é obrigatório." });
    }

    list.add(String(item));

    return res.status(201).json({
      message: "Item adicionado com sucesso.",
      item: String(item),
      structure: list.name,
    });
  }

  public remove(_req: Request, res: Response): Response {
    const removedItem = list.remove();

    if (removedItem === undefined) {
      return res.status(404).json({ message: "A lista está vazia." });
    }

    return res.status(200).json({
      message: "Item removido com sucesso.",
      item: removedItem,
    });
  }

  public peek(_req: Request, res: Response): Response {
    const lastItem = list.peek();

    if (lastItem === undefined) {
      return res.status(404).json({ message: "A lista está vazia." });
    }

    return res.status(200).json({ ultimo: lastItem });
  }

  public getAll(_req: Request, res: Response): Response {
    return res.status(200).json({
      id: list.getId(),
      nome: list.name,
      tamanho: list.getSize(),
      itens: list.getItems(),
    });
  }

  public getAt(req: Request, res: Response): Response {
    const index = Number(req.params.index);

    if (!Number.isInteger(index) || index < 0) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    const item = list.getAt(index);

    if (item === undefined) {
      return res.status(404).json({ message: "Não existe item nesse índice." });
    }

    return res.status(200).json({
      indice: index,
      item,
    });
  }

  public removeAt(req: Request, res: Response): Response {
    const index = Number(req.params.index);

    if (!Number.isInteger(index) || index < 0) {
      return res.status(400).json({ message: "Índice inválido." });
    }

    const removedItem = list.removeAt(index);

    if (removedItem === undefined) {
      return res.status(404).json({ message: "Não existe item nesse índice." });
    }

    return res.status(200).json({
      indice: index,
      removido: removedItem,
    });
  }

  public clear(_req: Request, res: Response): Response {
    list.clear();

    return res.status(200).json({ message: "Lista limpa com sucesso." });
  }
}

export const listController = new ListController();
