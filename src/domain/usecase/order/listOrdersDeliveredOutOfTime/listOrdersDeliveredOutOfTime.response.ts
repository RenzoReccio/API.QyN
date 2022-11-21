import { ApiProperty } from "@nestjs/swagger";

export class ListOrdersDeliveredOutOfTimeTimeResponse {
  @ApiProperty()
  month: string;

  @ApiProperty()
  quantityDeliveredOutOfTime: number;
  
  @ApiProperty()
  quantityDeliveredInTime: number; 

  constructor(month: string, quantityDeliveredOutOfTime: number, quantityDeliveredInTime: number) {
    this.month = month;
    this.quantityDeliveredOutOfTime = quantityDeliveredOutOfTime;
    this.quantityDeliveredInTime = quantityDeliveredInTime;

  }
}