import { ApiProperty } from "@nestjs/swagger";

export class UpdateSupplierDto {
  @ApiProperty()
  id;

  @ApiProperty()
  ruc: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  email: string;
}