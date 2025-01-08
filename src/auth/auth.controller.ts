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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch()
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(changePasswordDto);
  }

  @Get(':id')
  async currentUser(@Param('id') id: string) {
    return await this.authService.currentUser(id);
  }

  @Patch()
  async editProfile(@Body() editProfileDto: EditProfileDto) {
    return await this.authService.editProfile(editProfileDto);
  }

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
