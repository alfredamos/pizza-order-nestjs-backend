/* eslint-disable prettier/prettier */
export class ChangePasswordDto {
  email: string;
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}