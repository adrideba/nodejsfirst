import { Router } from "express";
import { cacheMiddleware } from "../helpers/cache.helper";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "../helpers/db.helper";

const router = Router();
const cacheTime = 84600;

// Get all articles
router.get("/", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();

    const catResult = await pool
      .request()
      .query(`SELECT * FROM dbo.Article ORDER BY Id DESC`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});


// Get article by id
router.get("/:id", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const { id } = req.params;

    const catResult = await pool
      .request()
      .query(`SELECT * FROM dbo.Article WHERE Id = ${id}`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});

// Get article categories
router.get("/category", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();

    const catResult = await pool
      .request()
      .query(`SELECT * FROM dbo.ArticleCategory`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});


export default router;
