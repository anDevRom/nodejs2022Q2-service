import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async getTokens(userId: string, login: string) {
    const tokenPayload = {
      sub: userId,
      login,
    };

    const accessTokenOptions: JwtSignOptions = {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenPayload, accessTokenOptions),
      this.jwtService.signAsync(tokenPayload, refreshTokenOptions),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: string, newRefreshToken: string) {
    await this.usersService.updateRefreshToken(id, newRefreshToken);
  }

  async signUp(dto: CreateUserDto) {
    const { id, login } = await this.usersService.create(dto);

    const tokens = await this.getTokens(id, login);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async login(dto: CreateUserDto) {
    const user = await this.usersService.getOneByLogin(dto.login);

    if (!user) {
      return;
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      return;
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refresh(id: string, refreshToken: string) {
    const user = await this.usersService.getOne(id);

    if (!user || !user.refreshToken) {
      return;
    }

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!tokenMatches) {
      return;
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
