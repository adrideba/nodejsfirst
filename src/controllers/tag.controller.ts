import { Router } from "express";
import { cacheMiddleware } from "../helpers/cache.helper";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "../helpers/db.helper";

const router = Router();
const cacheTime = 999999999;

// Get all tags
router.get("/:take", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const { take } = req.params;

    const catResult = await pool
      .request()
      .query(`SELECT TOP(${take}) * FROM dbo.Tags`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});

export default router;
