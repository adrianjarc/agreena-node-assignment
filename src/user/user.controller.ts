import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDetailsDto } from './dto/user.details.dto';
import { User } from '../common/decorator/user';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@User() user: UserEntity): Promise<UserDetailsDto> {
    return UserDetailsDto.fromUserEntity(user);
  }
}
