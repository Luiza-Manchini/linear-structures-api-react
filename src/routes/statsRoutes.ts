import { Router } from "express";
import { structureStatsController } from "../controllers/StructureStatsController";

const statsRoutes = Router();

statsRoutes.get("/estatisticas", (req, res) => structureStatsController.getStats(req, res));

export default statsRoutes;
