import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API saudável
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "ok" }
 *                 timestamp: { type: string, format: date-time }
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
