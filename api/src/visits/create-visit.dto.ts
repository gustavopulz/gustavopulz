import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVisitDto {
  @IsString() @MaxLength(300) path: string;
  @IsOptional() @IsString() @MaxLength(300) referrer?: string;
}
