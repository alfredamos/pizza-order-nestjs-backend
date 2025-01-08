/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { ChangePasswordDto } from './dto/change-password.Dto';
import { EditProfileDto } from './dto/edit-profile.Dto';
import { LoginDto } from './dto/loginDto';
import bcrypt from "bcryptjs"
import { AuthResponseModel } from 'src/models/authResponse.model';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async changePassword(changePasswordDto: ChangePasswordDto) {
    //----> Destructure the payload.
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordDto;

    //----> Check for password match
    if (!this.matchPassword(newPassword, confirmPassword)) {
      throw new BadRequestException('Password must match!');
    }

    //----> Get user from database.
    const user = await this.getUserByEmail(email);

    //----> Check that the old password is correct.
    const isMatch = await this.comparePassword(oldPassword, user);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials ');
    }

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(newPassword);

    //----> Store the updated user in the database.
    const updatedUser = await this.prisma.user.update({
      data: { ...user, password: hashNewPassword },
      where: { email },
    });

    const { role, password, ...rest } = updatedUser;

    return rest;
  }

  async currentUser(id: string) {
    const currentUser = await this.getUserById(id);

    //----> Remove role and password from the user object.
    const { password, ...rest } = currentUser;

    return rest;
  }

  async editProfile(editProfileDto: EditProfileDto) {
    //----> Destructure the payload.
    const { email, password, ...rest } = editProfileDto;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    const isMatch = await this.comparePassword(password, user);

    //----> Store the updated user in the database.
    const updatedUser = await this.prisma.user.update({
      data: { ...rest, password: user.password },
      where: { email },
    });

    const { role: _role, password: _userPassword, ...restOfData } = updatedUser;

    return restOfData;
  }

  async login(loginDto: LoginDto) {
    //----> Destructure the payload.
    const { email, password } = loginDto;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    const isMatch = await this.comparePassword(password, user);

    //----> Get new token.
    const token = this.jwt.sign({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    const { password: _userPassword, role: _role, ...restOfData } = user;

    const authResponse: AuthResponseModel = {
      user: restOfData as User,
      token,
      isLoggedIn: true,
      isAdmin: user?.role === Role.Admin,
    };

    return authResponse;
  }

  async signup(signupDto: SignupDto) {
    //----> Destructure the payload.
    const { email, password, confirmPassword, ...rest } = signupDto;

    //----> Check for password match, check for existence of user.
    await this.signupUtil(confirmPassword, email, password);

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(password);

    //----> Store the new user in the database.
    const newUser = await this.prisma.user.create({
      data: { ...rest, password: hashNewPassword, email },
    });

    const { password: userPassword, ...restOfData } = newUser;

    return restOfData;
  }

  private matchPassword(newPassword: string, oldPassword: string) {
    const isMatch = newPassword.normalize() === oldPassword.normalize();

    return isMatch;
  }

  private async getUserById(id: string) {
    //----> Get the user.
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    //----> Check for existence of user.
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }

  private async getUserByEmail(email: string) {
    //----> Get user from database.
    const user = await this.prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (!user) {
      throw new NotFoundException('Invalid credentials!');
    }

    return user;
  }

  private async comparePassword(oldPassword: string, user: User) {
    //----> Compare the new password with old password.
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    //----> Check if the two passwords match.
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return isMatch;
  }

  private async passwordHarsher(newPassword: string) {
    //----> Hash the new password.
    return await bcrypt.hash(newPassword, 12);
  }

  private async signupUtil(
    confirmPassword: string,
    email: string,
    password: string,
  ) {
    //----> Check for password match
    if (!this.matchPassword(password, confirmPassword)) {
      throw new BadRequestException('Password must match!');
    }

    //----> Get user from database.
    const user = await this.prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (user) {
      throw new BadRequestException('User already exists!');
    }
  }
}