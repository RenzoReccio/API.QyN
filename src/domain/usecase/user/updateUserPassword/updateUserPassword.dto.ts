import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  password: string;
}