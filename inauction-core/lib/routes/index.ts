import { Router, Request, Response } from "express";
import authRouters from "./authentication/authenticationRoutes";
import userRouters from "./user/userRoutes";
import eventCategoryRoutes from "./eventCategory/eventCategoryRoutes";
import currencyRoutes from "./currency/currencyRoutes";
import categoryRoute from "./category/categoryRoute";
import activityRoutes from "./activity/activityRoutes";
import systemRouters from  "./system/systemRoutes"
import expertRoutes from "./expert/expertRoutes";
import eventRoute from "./event/eventRoute";
import eventParticipantRoute from './eventParticipant/eventParticipantRoute'
import companyRoute from "./company/companyRoute";
import lotRoutes from "./lot/lotRoutes";
import taskRouters from "./tasks/taskRoutes"
import questionnairesRoute from "./questionnaire/questionnairesRoute"
import sectionRoute from "./section/sectionRoute"
import questionRoute from "./question/questionRoute"
import businessOperationRoutes from "./businessOperation/businessOperationRoute"
import legalFormRoutes from "./legalForm/legalFormRoute"
import uomRoutes from "./uom/uomRoute"
import hostRoutes from "./host/hostRoutes"
import bidderRoutes from "./bidder/bidderRoutes"
import webRoutes from "./web/webRoutes"
import fileRoutes from "./file/fileRoutes";
import roleRoutes from "./role/roleRoutes";
import inviteBidderRoutes from "./inviteBidder/inviteBidderRoutes";
import appNotificationsRoutes from "./appNotifications/appNotificationsRoutes";
const routes = Router();

routes.use("", activityRoutes);
routes.use("", authRouters);
routes.use("", categoryRoute);
routes.use("", currencyRoutes);
routes.use("", eventCategoryRoutes);
routes.use("", expertRoutes);
routes.use("", questionnairesRoute);
routes.use("", taskRouters);
routes.use("", systemRouters);
routes.use("", userRouters);
routes.use("", eventRoute);
routes.use("", eventParticipantRoute);
routes.use("", sectionRoute);
routes.use("", questionRoute);
routes.use("", companyRoute);
routes.use("", lotRoutes);
routes.use("", businessOperationRoutes);
routes.use("", legalFormRoutes);
routes.use("", uomRoutes);
routes.use("", hostRoutes);
routes.use("", bidderRoutes);
routes.use("", webRoutes);
routes.use("", fileRoutes);
routes.use("", roleRoutes);
routes.use("", inviteBidderRoutes);
routes.use("", appNotificationsRoutes);
export default routes;