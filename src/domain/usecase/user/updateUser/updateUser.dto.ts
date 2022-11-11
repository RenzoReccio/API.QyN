import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;
  
  @ApiProperty()
  bornDate: Date;

  @ApiProperty()
  isActive: boolean;
}