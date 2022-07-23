import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
