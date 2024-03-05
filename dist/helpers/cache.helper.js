"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const memory_cache_1 = __importDefault(require("memory-cache"));
const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        const key = `__express__${req.originalUrl}` || req.url;
        const cachedBody = memory_cache_1.default.get(key);
        if (cachedBody) {
            try {
                const jsonData = JSON.parse(cachedBody);
                res.json(jsonData);
            }
            catch (error) {
                console.error('Error parsing cached data as JSON:', error);
                res.send(cachedBody);
            }
            return;
        }
        else {
            res.sendResponse = res.send;
            res.send = (body) => {
                memory_cache_1.default.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=cache.helper.js.map