import { IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
