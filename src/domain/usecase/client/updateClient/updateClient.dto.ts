import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  typeDocumentId: number;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}