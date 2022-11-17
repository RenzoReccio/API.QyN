import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordResponse {
  @ApiProperty()
  email: string;
  
  constructor(email: string) {
    this.email = email;
  }
}