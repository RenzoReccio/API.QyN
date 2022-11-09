import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class SubmitOrderCommentsDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id no tiene el formato correcto'
  })
  id: number;

  @ApiProperty()
  @IsString({
    message: 'El comentario del pedido no tiene el formato correcto'
  })
  commentsOnOrder: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'La puntuación no tiene el formato correcto'
  })
  @Min(0, {
    message: 'La puntuación minima es 0'
  })
  @Max(5, {
    message: 'La puntuación maxima es 5'
  })
  punctuation: number;
}