import { ApiProperty } from '@nestjs/swagger';

export class NationalProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  name: string;
}
