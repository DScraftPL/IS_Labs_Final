import { Request, Response, NextFunction } from "express"

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  console.log(`\x1b[32m[INFO]\x1b[0m [${formattedDate}] ${req.method} ${req.url}`);
  next();
}

export default loggingMiddleware;