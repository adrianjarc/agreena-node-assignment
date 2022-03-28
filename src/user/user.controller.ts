import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDetailsDto } from './dto/user.details.dto';
import { User } from '../common/decorator/user';
import { UserEntity } from '../entities/user.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Logged in user details',
  })
  @ApiOkResponse({
    type: UserDetailsDto,
  })
  @Get('me')
  async me(@User() user: UserEntity): Promise<UserDetailsDto> {
    return await this.userService.getUserWithCertificates(user.id);
  }
}
