import { Person } from "./interface/person.interface";

export class PersonModel implements Person {
  id: number;
  firstName: string;
  lastName: string;
  surName: string;
  bornDate: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    surName: string,
    bornDate: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.bornDate = bornDate;
  }
}