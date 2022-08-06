import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UnauthorizedInterceptor } from 'src/interceptors';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authService.signUp(dto);
  }

  @UseInterceptors(UnauthorizedInterceptor)
  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @Post('/refresh')
  async refresh() {
    return await this.authService.refresh();
  }
}
