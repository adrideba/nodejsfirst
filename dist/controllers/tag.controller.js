"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_helper_1 = require("../helpers/cache.helper");
const db_helper_1 = require("../helpers/db.helper");
const router = (0, express_1.Router)();
const cacheTime = 999999999;
// Get all tags
router.get("/:take", (0, cache_helper_1.cacheMiddleware)(cacheTime), async (req, res) => {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const { take } = req.params;
        const catResult = await pool
            .request()
            .query(`SELECT TOP(${take}) * FROM dbo.Tags`);
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
//# sourceMappingURL=tag.controller.js.map