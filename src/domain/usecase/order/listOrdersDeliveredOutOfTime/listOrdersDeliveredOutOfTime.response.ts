
export class ListOrdersDeliveredOutOfTimeTimeResponse {
  month: string;
  quantityDeliveredOutOfTime: number; 
  quantityDeliveredInTime: number; 

  constructor(month: string, quantityDeliveredOutOfTime: number, quantityDeliveredInTime: number) {
    this.month = month;
    this.quantityDeliveredOutOfTime = quantityDeliveredOutOfTime;
    this.quantityDeliveredInTime = quantityDeliveredInTime;

  }
}