import { IsString, Matches, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserCreateDto {
  @ApiModelProperty()
  @IsString()
  readonly username: string;

  @ApiModelProperty({
    minLength: 8,
    pattern:
      '^.*(?=.*\\p{Uppercase_Letter})(?=.*\\p{Lowercase_Letter})(?=.*\\p{Number})(?=.*[\\p{Symbol}\\p{Other}\\p{Mark}\\p{Punctuation}]).*$',
    format: 'password',
  })
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
