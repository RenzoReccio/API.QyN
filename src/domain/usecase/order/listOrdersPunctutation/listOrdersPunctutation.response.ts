import { ApiProperty } from "@nestjs/swagger";

export class ListOrdersPunctuationResponse {
  @ApiProperty()
  punctuation: number;
  
  @ApiProperty()
  quantity: number; 

  constructor(punctuation: number, quantity: number) {
    this.punctuation = punctuation;
    this.quantity = quantity;
  }
}