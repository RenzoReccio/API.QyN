import { ApiProperty } from "@nestjs/swagger";

type TypeMovement = 'Ingreso' | 'Salida'
export class ListMovementsResponse {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  typeMovement: TypeMovement;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  stock: number;

  constructor(date: Date, typeMovement: TypeMovement, quantity: number) {
    this.date = date;
    this.typeMovement = typeMovement;
    this.quantity = quantity;
    this.stock = 0;
  }
}