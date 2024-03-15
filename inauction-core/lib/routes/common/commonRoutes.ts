import { Application, Request, Response, Router } from 'express';


// Mismatch URL
const commonRoutes = Router();
commonRoutes.all('*', function (req: Request, res: Response) {
    res.status(404).send({ error: true, message: 'Check your URL please' });
});
export default commonRoutes;
