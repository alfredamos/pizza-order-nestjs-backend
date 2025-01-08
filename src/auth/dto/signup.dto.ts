/* eslint-disable prettier/prettier */
import { Gender } from '@prisma/client';

export class SignupDto {
  address: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  confirmPassword: string;
  password: string;
}
