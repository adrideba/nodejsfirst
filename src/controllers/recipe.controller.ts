import { Router } from "express";
import { cacheMiddleware } from "../helpers/cache.helper";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "../helpers/db.helper";

const router = Router();
const cacheTime = 84600;

// Get recipe by ID
router.get("/:id", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT TOP(1) * FROM dbo.Recipe WHERE Id = ${id}`);
    res.json({ recipes: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDatabaseConnection();
  }
});

// Get recipe main banners (top carousel)
router.get(
  "/banners/:take",
  cacheMiddleware(cacheTime),
  async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const { take } = req.params;
      const result = await pool
        .request()
        .query(
          `SELECT TOP(${take}) Id, Title, Description FROM dbo.Recipe WHERE CategoryId = 143`
        );
      res.json({ banners: result.recordset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Get random recipes
router.get(
  "/random/:take",
  async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const { take } = req.params;
      const result = await pool
        .request()
        .query(`SELECT TOP(${take}) * FROM dbo.Recipe ORDER BY NEWID()`);
      res.json({ recipes: result.recordset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Get recipes by category id (with pagination)
router.get(
  "/category/:categoryId/:page",
  cacheMiddleware(cacheTime),
  async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const { categoryId } = req.params;
      const { page } = req.params;

      let sqlPage = 0;
      let p = parseInt(page);

      if (p == 1) sqlPage = 0;
      else sqlPage = p * 10 - 9;

      const result = await pool
        .request()
        .query(
          `SELECT * FROM dbo.Recipe WHERE CategoryId = ${categoryId} ORDER BY Title OFFSET ${sqlPage} ROWS FETCH NEXT 10 ROWS ONLY`
        );
      res.json({ recipes: result.recordset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Get recipes by search (with pagination)
router.get(
  "/search/:search/:page",
  cacheMiddleware(cacheTime),
  async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const { search } = req.params;
      const { page } = req.params;

      let sqlPage = 0;
      let p = parseInt(page);

      if (p == 1) sqlPage = 0;
      else sqlPage = p * 10 - 9;

      const result = await pool
        .request()
        .query(
          `SELECT * FROM dbo.Recipe WHERE Title LIKE '%${search}%' ORDER BY Title OFFSET ${sqlPage} ROWS FETCH NEXT 10 ROWS ONLY`
        );
      res.json({ recipes: result.recordset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Get recipes by tag (with pagination)
router.get(
  "/tag/:tag/:page",
  cacheMiddleware(cacheTime),
  async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const { tag } = req.params;
      const { page } = req.params;

      let sqlPage = 0;
      let p = parseInt(page);

      if (p == 1) sqlPage = 0;
      else sqlPage = p * 10 - 9;

      const result = await pool
        .request()
        .query(
          `SELECT * FROM dbo.Recipe WHERE Tags LIKE '%${tag}%' ORDER BY Title OFFSET ${sqlPage} ROWS FETCH NEXT 10 ROWS ONLY`
        );
      res.json({ recipes: result.recordset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

export default router;
