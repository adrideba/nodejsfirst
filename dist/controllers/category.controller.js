"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_helper_1 = require("../helpers/cache.helper");
const db_helper_1 = require("../helpers/db.helper");
const type_category_model_1 = require("../models/type-category.model");
const category_model_1 = require("../models/category.model");
const router = (0, express_1.Router)();
const cacheTime = 999999999;
// Get category types with categories included per type
router.get("/", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const catTypeResult = await pool
            .request()
            .query(`SELECT * FROM dbo.CategoryType`);
        const categoryTypes = catTypeResult.recordset.map((row) => new type_category_model_1.TypeCategory(row.Id, row.Name, row.Image));
        const catResult = await pool.request().query(`SELECT * FROM dbo.Category`);
        const categories = catResult.recordset.map((row) => new category_model_1.Category(row.Id, row.CategoryName, row.Type, row.Image));
        categoryTypes.forEach((x) => {
            x.categories = x.categories || [];
            x.categories?.push(...categories.filter((cat) => cat.type == x.id));
        });
        res.json({ categorytypes: categoryTypes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
    finally {
        await (0, db_helper_1.closeDatabaseConnection)();
    }
});
// Get categories by type
router.get("/type/:type", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const { type } = req.params;
        const catResult = await pool
            .request()
            .query(`SELECT * FROM dbo.Category WHERE Type = ${type}`);
        res.json({ category: catResult });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
    finally {
        await (0, db_helper_1.closeDatabaseConnection)();
    }
});
// Get latest categories
router.get("/latest", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const catResult = await pool
            .request()
            .query(`SELECT TOP(8) * FROM dbo.Category ORDER BY Id DESC`);
        res.json({ category: catResult });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
    finally {
        await (0, db_helper_1.closeDatabaseConnection)();
    }
});
exports.default = router;
//# sourceMappingURL=category.controller.js.map