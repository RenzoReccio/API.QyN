import { ApiProperty } from "@nestjs/swagger";

export class CreateVehicleDto {
  @ApiProperty()
  typeVehicleId: number;

  @ApiProperty()
  driverId: number;

  @ApiProperty()
  plate: string;

  @ApiProperty()
  brand: string;
  
  @ApiProperty()
  color: string;
}