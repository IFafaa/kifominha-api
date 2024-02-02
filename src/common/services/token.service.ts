import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  private async getToken(data: object) {
    return await this.jwtService.signAsync(data, {
      expiresIn: "24h",
      secret: process.env.JWT_SECRET,
    });
  }

  async getTokenClient<T>(client: T) {
    return await this.getToken({ ...client, password: undefined });
  }
}
