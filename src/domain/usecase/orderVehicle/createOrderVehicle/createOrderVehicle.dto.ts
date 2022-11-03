import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderVehicleDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  vehicleId: number;

  @ApiProperty()
  date: Date;
}