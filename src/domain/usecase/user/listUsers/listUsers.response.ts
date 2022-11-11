import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/model/interface/users.interface";

export class ListUsersResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  fullName: string;
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.isActive = user.isActive;
    this.fullName = (user.person.firstName ?? '') + ' ' + (user.person.lastName ?? '') + ' ' + (user.person.surName ?? '');
    this.fullName = this.fullName.trim();
  }
}