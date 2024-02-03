import express from 'express';
import cache from 'memory-cache';

export const cacheMiddleware = (duration: number) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      try {
        const jsonData = JSON.parse(cachedBody);
        res.json(jsonData);
      } catch (error) {
        console.error('Error parsing cached data as JSON:', error);
        res.send(cachedBody);
      }
      return;
    } else {
      (res as any).sendResponse = (res as any).send;
      (res as any).send = (body: any) => {
        cache.put(key, body, duration * 1000);
        (res as any).sendResponse(body);
      };
      next();
    }
  };
};
