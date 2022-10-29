import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
  @ApiProperty()
  ruc: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  email: string;
}