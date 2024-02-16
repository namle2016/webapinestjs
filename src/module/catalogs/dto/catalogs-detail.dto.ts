import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "src/shared/common/AbstractDto";
import { ResponseTranslationDto } from "src/shared/common/translation.dto";
import { CatalogsDto } from "./catalogs.dto";
import { CatalogsDetailEntity } from "../entities/catalog-detail.entity";


export interface ICatalogsDetailDtoOptions {}
export class CatalogsDetailDto extends AbstractDto {
    @ApiProperty()
    code: string;
  
    @ApiProperty()
    name: ResponseTranslationDto;
  
    @ApiProperty()
    slug: string;
  
    @ApiProperty()
    index: number;
  
    @ApiProperty()
    catalog: CatalogsDto;
  
    @ApiProperty()
    isActive: boolean;
  
    constructor(entityName: CatalogsDetailEntity, options?: ICatalogsDetailDtoOptions) {
      super(entityName);
      this.code = entityName.code;
      this.name = new ResponseTranslationDto(entityName.name);
      this.slug = entityName.slug;
      this.index = entityName.index;
      this.isActive = entityName.isActive;
      if (entityName.catalog) {
        this.catalog = entityName.catalog.toDto();
      }
    }
  }
  