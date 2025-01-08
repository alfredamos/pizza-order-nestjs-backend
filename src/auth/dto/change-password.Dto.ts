/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsEmail} from "class-validator"

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}

