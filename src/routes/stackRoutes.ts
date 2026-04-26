import { Router } from "express";
import { stackController } from "../controllers/StackController";

const stackRoutes = Router();

stackRoutes.post("/pilha", (req, res) => stackController.add(req, res));
stackRoutes.delete("/pilha", (req, res) => stackController.remove(req, res));
stackRoutes.get("/pilha/topo", (req, res) => stackController.peek(req, res));
stackRoutes.get("/pilha", (req, res) => stackController.getAll(req, res));
stackRoutes.delete("/pilha/limpar", (req, res) => stackController.clear(req, res));

export default stackRoutes;
