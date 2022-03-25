import { IsString, Matches, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(8, {
    message: 'password must be at least 8 characters long',
  })
  @Matches(
    /^.*(?=.*\p{Uppercase_Letter})(?=.*\p{Lowercase_Letter})(?=.*\p{Number})(?=.*[\p{Symbol}\p{Other}\p{Mark}\p{Punctuation}]).*$/u,
    {
      message:
        'password must contain one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  readonly password: string;
}
