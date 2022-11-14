import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsDateString, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString({ message: 'El primer nombre no tiene el formato correcto.' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'El primer apellido no tiene el formato correcto.' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'El segundo apellido no tiene el formato correcto.' })
  surName: string;
  
  @ApiProperty()
  @IsDateString({ message: 'La fecha de nacimiento no tiene el formato correcto.' })
  bornDate: Date;

  @ApiProperty()
  @IsBoolean({message: "IsActive no tiene el formato correcto"})
  isActive: boolean;
}