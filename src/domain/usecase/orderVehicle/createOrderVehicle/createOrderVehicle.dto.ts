import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CreateOrderVehicleDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id pedido no tiene el formato correcto.'
  })
  orderId: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id vehiculo no tiene el formato correcto.'
  })
  vehicleId: number;

  @ApiProperty()
  @IsDateString({ message: 'La fecha de entrega no tiene el formato correcto.' })
  date: Date;
}