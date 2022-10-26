import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  typeDocumentId: number;
  
  @ApiProperty()
  numberDocument: string;
  
  @ApiProperty()
  companyName: string;
  
  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;
  
  @ApiProperty()
  bornDate: Date;
}