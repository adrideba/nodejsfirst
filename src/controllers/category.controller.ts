import { Router } from "express";
import { cacheMiddleware } from "../helpers/cache.helper";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "../helpers/db.helper";
import { TypeCategory } from "../models/type-category.model";
import { Category } from "../models/category.model";

const router = Router();
const cacheTime = 999999999;

// Get category types with categories included per type
router.get("/", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const catTypeResult = await pool
      .request()
      .query(`SELECT * FROM dbo.CategoryType`);
    const categoryTypes = catTypeResult.recordset.map(
      (row) => new TypeCategory(row.Id, row.Name, row.Image)
    );

    const catResult = await pool.request().query(`SELECT * FROM dbo.Category`);
    const categories = catResult.recordset.map(
      (row) => new Category(row.Id, row.CategoryName, row.Type, row.Image)
    );

    categoryTypes.forEach((x) => {
      x.categories = x.categories || [];
      x.categories?.push(...categories.filter((cat) => cat.type == x.id));
    });

    res.json({ categorytypes: categoryTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});

// Get categories by type
router.get("/type/:type", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const { type } = req.params;

    const catResult = await pool
      .request()
      .query(`SELECT * FROM dbo.Category WHERE Type = ${type}`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});

// Get latest categories
router.get("/latest", cacheMiddleware(cacheTime), async (req, res) => {
  try {
    const pool = await connectToDatabase();

    const catResult = await pool
      .request()
      .query(`SELECT TOP(8) * FROM dbo.Category ORDER BY Id DESC`);

    res.json({ category: catResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  } finally {
    await closeDatabaseConnection();
  }
});

export default router;
