import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/model/interface/users.interface";

export class ListUserByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;

  @ApiProperty()
  bornDate: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.isActive = user.isActive;
    this.firstName = user.person.firstName;
    this.lastName = user.person.lastName;
    this.surName = user.person.surName;
    this.bornDate = user.person.bornDate;
  }
}