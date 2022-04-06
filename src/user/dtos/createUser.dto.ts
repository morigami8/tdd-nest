import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'email cannot be blank',
    },
  )
  email: string;

  @IsString()
  password: string;
}
