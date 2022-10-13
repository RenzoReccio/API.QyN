import { Person } from "./person.interface";
import { TypeDocument } from "./typeDocument.interface";

export interface Driver {
  id: number;
  typeDocument: TypeDocument;
  numberDocument: string;
  person: Person;
  licenseUrlFile: string;
}