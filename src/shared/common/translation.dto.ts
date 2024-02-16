import { ApiProperty } from '@nestjs/swagger';

export class TranslationDto {
  @ApiProperty()
  vn_VN: string | null;

  @ApiProperty()
  en_US: string | null;
}

export class ResponseTranslationDto {
  @ApiProperty()
  vi: string | null;

  @ApiProperty()
  en: string | null;

  constructor(entity: TranslationDto) {
    this.vi = entity?.vn_VN ?? '';
    this.en = entity?.en_US ?? '';
  }
}
