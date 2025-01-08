/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.Dto';
import { EditProfileDto } from './dto/edit-profile.Dto';
import { LoginDto } from './dto/loginDto';
import { UserInfo } from 'src/models/userInfo.model';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles('Admin', 'Staff', 'User')
  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(changePasswordDto);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get('current-user')
  async currentUser(@CurrentUser() user: UserInfo) {
    return await this.authService.currentUser(user?.id);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch('edit-profile')
  async editProfile(@Body() editProfileDto: EditProfileDto) {
    return await this.authService.editProfile(editProfileDto);
  }

  @IsPublic()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
