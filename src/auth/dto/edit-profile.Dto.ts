/* eslint-disable prettier/prettier */
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class EditProfileDto {
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
  password: string;
}
