import { Body, Controller, Post, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UnauthorizedInterceptor } from 'src/interceptors';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Public()
  @Post('signup')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @UseInterceptors(UnauthorizedInterceptor)
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @UseInterceptors(UnauthorizedInterceptor)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@GetCurrentUser() user: any) {
    return await this.authService.refresh(user.sub, user.refreshToken);
  }
}
