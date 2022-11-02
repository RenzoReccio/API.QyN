import { ApiProperty } from "@nestjs/swagger";

export class CreaeOrderVehicleDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  vehicleId: number;

  @ApiProperty()
  date: Date;
}