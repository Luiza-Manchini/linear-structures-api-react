import { Router } from "express";
import listRoutes from "./listRoutes";
import queueRoutes from "./queueRoutes";
import stackRoutes from "./stackRoutes";
import statsRoutes from "./statsRoutes";

const routes = Router();

routes.use(stackRoutes);
routes.use(queueRoutes);
routes.use(listRoutes);
routes.use(statsRoutes);

export default routes;
