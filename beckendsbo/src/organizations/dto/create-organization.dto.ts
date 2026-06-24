import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'HIMATIF',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Himpunan Mahasiswa Teknik Informatika',
  })
  @IsOptional()
  @IsString()
  description?: string;
}