import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id tipo vehiculo no tiene el formato correcto.'
  })
  typeVehicleId: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id conductor no tiene el formato correcto.'
  })
  driverId: number;

  @ApiProperty()
  @IsString({
    message: 'La placa no tiene el formato correcto'
  })
  plate: string;

  @ApiProperty()
  @IsString({
    message: 'La marca no tiene el formato correcto'
  })
  brand: string;
  
  @ApiProperty()
  @IsString({
    message: 'El color no tiene el formato correcto'
  })
  color: string;
}