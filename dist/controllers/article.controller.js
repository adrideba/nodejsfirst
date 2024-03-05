"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_helper_1 = require("../helpers/cache.helper");
const db_helper_1 = require("../helpers/db.helper");
const router = (0, express_1.Router)();
const cacheTime = 84600;
// Get all articles
router.get("/", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const catResult = await pool
            .request()
            .query(`SELECT * FROM dbo.Article ORDER BY Id DESC`);
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
// Get article by id
router.get("/:id", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const { id } = req.params;
        const catResult = await pool
            .request()
            .query(`SELECT * FROM dbo.Article WHERE Id = ${id}`);
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
// Get article categories
router.get("/category", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const catResult = await pool
            .request()
            .query(`SELECT * FROM dbo.ArticleCategory`);
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
//# sourceMappingURL=article.controller.js.map