import { UseDto } from "src/shared/common/use-dto.decorator";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { CatalogsDto, ICatalogsDtoOptions } from "../dto/catalogs.dto";
import { AbstractEntity } from "src/shared/common/abstract.entity";
import { generateRandomCode } from "src/shared/common/utils";
import { TranslationDto } from "src/shared/common/translation.dto";
import { CatalogsDetailEntity } from "./catalog-detail.entity";

@Entity({ name: 'catalogs' })
@Index('idx_catalogs_id', ['id'])
@Index('idx_catalogs', ['name', 'slug', 'index', 'isActive'])
@UseDto(CatalogsDto)
export class CatalogsEntity extends AbstractEntity<CatalogsDto, ICatalogsDtoOptions> {
  @Column({ unique: true, default: generateRandomCode(5, false).toUpperCase() })
  code: string;

  @Column({ type: 'jsonb' })
  name: TranslationDto;

  @Column()
  slug: string;

  @Column({ type: 'real', default: 1.001 })
  index: number;

  @OneToMany(() => CatalogsDetailEntity, (catalogsDetail) => catalogsDetail.catalog, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  catalogsDetail: CatalogsDetailEntity[];

//   @OneToMany(() => ProductsCatalogsEntity, (productsCatalogs) => productsCatalogs.catalog, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   })
//   productCatalogs: ProductsCatalogsEntity[];

  @Column({ default: true })
  isActive: boolean;
}
