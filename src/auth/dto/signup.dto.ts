/* eslint-disable prettier/prettier */
import { Gender } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  gender: Gender;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
