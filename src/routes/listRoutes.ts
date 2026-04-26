import { Router } from "express";
import { listController } from "../controllers/ListController";

const listRoutes = Router();

listRoutes.post("/lista", (req, res) => listController.add(req, res));
listRoutes.delete("/lista", (req, res) => listController.remove(req, res));
listRoutes.get("/lista/ultimo", (req, res) => listController.peek(req, res));
listRoutes.get("/lista", (req, res) => listController.getAll(req, res));
listRoutes.delete("/lista/limpar", (req, res) => listController.clear(req, res));
listRoutes.get("/lista/:index", (req, res) => listController.getAt(req, res));
listRoutes.delete("/lista/:index", (req, res) => listController.removeAt(req, res));

export default listRoutes;
