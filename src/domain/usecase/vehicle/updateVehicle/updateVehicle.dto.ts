import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehicleDto {
  @ApiProperty()
  id: number;

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

  @ApiProperty()
  status: boolean
}