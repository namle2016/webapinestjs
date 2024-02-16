import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/shared/common/AbstractDto';
import { ResponseTranslationDto } from 'src/shared/common/translation.dto';
import { CatalogsDetailDto } from './catalogs-detail.dto';
import { CatalogsEntity } from '../entities/catalogs.entity';

export interface ICatalogsDtoOptions {}

export class CatalogsDto extends AbstractDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: ResponseTranslationDto;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  index: number;

  @ApiProperty()
  catalogs: CatalogsDetailDto[];

  @ApiProperty()
  isActive: boolean;

  constructor(entityName: CatalogsEntity, options?: ICatalogsDtoOptions) {
    super(entityName);
    this.code = entityName.code;
    this.name = new ResponseTranslationDto(entityName.name);
    this.slug = entityName.slug;
    this.index = entityName.index;
    this.isActive = entityName.isActive;
  }
}
