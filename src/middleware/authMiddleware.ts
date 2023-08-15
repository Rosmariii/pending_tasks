import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  private static secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

  public static authenticateJWT(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, AuthMiddleware.secretKey, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        (req as any).user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
}
