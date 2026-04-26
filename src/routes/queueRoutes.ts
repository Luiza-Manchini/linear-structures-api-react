import { Router } from "express";
import { queueController } from "../controllers/QueueController";

const queueRoutes = Router();

queueRoutes.post("/fila", (req, res) => queueController.add(req, res));
queueRoutes.delete("/fila", (req, res) => queueController.remove(req, res));
queueRoutes.get("/fila/frente", (req, res) => queueController.peek(req, res));
queueRoutes.get("/fila", (req, res) => queueController.getAll(req, res));
queueRoutes.delete("/fila/limpar", (req, res) => queueController.clear(req, res));

export default queueRoutes;
