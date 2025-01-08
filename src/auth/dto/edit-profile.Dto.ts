/* eslint-disable prettier/prettier */
import { Gender } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class EditProfileDto{
  name: string;
    email: string;
    phone: string;
    gender: Gender;
    password: string;
}