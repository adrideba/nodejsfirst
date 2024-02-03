"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_helper_1 = require("../helpers/db.helper");
const router = (0, express_1.Router)();
const cacheTime = 84600;
// Get recipe by ID
router.get("/", async (req, res) => {
    try {
        //const pool = await connectToDatabase();
        //const result = await pool.request().query(`SELECT CT.*, C.* FROM dbo.CategoryType CT INNER JOIN dbo.Category C ON CT.Id = C.Type`);
        //res.json({ categorytypes: result.recordset });
        getCategoryTypesWithCategories();
    }
    catch (error) {
        //console.error(error);
        //res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        //await closeDatabaseConnection();
    }
});
// Function to get CategoryTypes with Categories ordered by Id in descending order
async function getCategoryTypesWithCategories() {
    try {
        const pool = await (0, db_helper_1.connectToDatabase)();
        const result = await pool.request().query(`
      SELECT
        ct.*,
        c.*
      FROM
        CategoryType ct
      LEFT JOIN
        Categories c ON ct.Id = c.Type
      ORDER BY
        ct.Id DESC;
    `);
        // Transform the result into a nested structure
        const categoryTypes = result.recordset.reduce((acc, row) => {
            const existingCategoryType = acc.find((ct) => ct.Id === row.Id);
            if (existingCategoryType) {
                // CategoryType already exists, add the category to its Categories array
                existingCategoryType.Categories.push({
                    CategoryId: row.CategoryId,
                    // Other category properties...
                });
            }
            else {
                // CategoryType doesn't exist, create a new entry
                acc.push({
                    Id: row.Id,
                    // Other CategoryType properties...
                    Categories: row.CategoryId
                        ? [{ CategoryId: row.CategoryId, /* Other category properties... */ }]
                        : [],
                });
            }
            return acc;
        }, []);
        return categoryTypes;
    }
    catch (err) {
        console.error(err);
        //res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await (0, db_helper_1.closeDatabaseConnection)();
    }
}
exports.default = router;
