import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { ForbiddenInterceptor } from 'src/interceptors';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public.decorator';
import { UpdateTokensDto } from './dto/update-tokens.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @UseInterceptors(ForbiddenInterceptor)
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @UseInterceptors(ForbiddenInterceptor)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@GetCurrentUser() user, @Body() dto: UpdateTokensDto) {
    if (!dto.refreshToken || typeof dto.refreshToken !== 'string') {
      throw new UnauthorizedException();
    }

    return await this.authService.refresh(user.sub, dto.refreshToken);
  }
}
