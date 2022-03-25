import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserShortDto } from '../user/dto/user.short.dto';
import { UserCreateDto } from '../user/dto/user.create.dto';
import { TokenShortDto } from './dto/token.short.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: UserCreateDto): Promise<UserShortDto> {
    return UserShortDto.fromUserEntity(await this.userService.createUser(user));
  }

  async login(user: UserCreateDto): Promise<TokenShortDto> {
    const userEntity = await this.userService.getUserByUsername(user.username);

    if (!userEntity) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const passwordCorrect = await compare(user.password, userEntity.password);

    if (!passwordCorrect) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const token = this.jwtService.sign({
      sub: userEntity.id,
    });

    return TokenShortDto.fromUserEntity(userEntity, token);
  }
}
