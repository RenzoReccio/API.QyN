import { ApiProperty } from "@nestjs/swagger";

export class ListMovementsResponse {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  typeMovement: string;
  
  @ApiProperty()
  quantity: number;

  constructor(date: Date, typeMovement: string, quantity: number) {
    
    this.date = date;
    this.typeMovement = typeMovement;
    this.quantity = quantity;
  }
}