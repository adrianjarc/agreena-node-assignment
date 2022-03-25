import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserShortDto } from '../user/dto/user.short.dto';
import { UserCreateDto } from '../user/dto/user.create.dto';
import { TokenShortDto } from './dto/token.short.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: UserCreateDto): Promise<UserShortDto> {
    return await this.authService.signUp(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: UserCreateDto): Promise<TokenShortDto> {
    return await this.authService.login(user);
  }
}
