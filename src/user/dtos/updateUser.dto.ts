import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(8)
  @IsOptional()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
}
