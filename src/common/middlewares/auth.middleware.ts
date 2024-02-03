import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.headers["client"] = decoded
        next();
      } catch (error) {
        throw new UnauthorizedException({ message: "Token inválido ou expirado." });
      }
    } else {
      throw new UnauthorizedException({ message: "Por favor, envie o token." });
    }
  }
}
