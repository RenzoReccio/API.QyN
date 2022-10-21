import { ApiProperty } from "@nestjs/swagger";
import { Driver } from "src/domain/model/interface/driver.interface";

export class ListDriversResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  typeDocumentId: number;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;

  @ApiProperty()
  licenseUrlFile: string;

  constructor(driver: Driver) {
    this.id = driver.id;
    this.typeDocumentId = driver.typeDocument.id;
    this.numberDocument = driver.numberDocument;
    this.firstName = driver.person.firstName;
    this.lastName = driver.person.lastName;
    this.surName = driver.person.surName;
    this.licenseUrlFile = driver.licenseUrlFile;
  }
} 