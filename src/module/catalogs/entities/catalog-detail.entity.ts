import { UseDto } from "src/shared/common/use-dto.decorator";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CatalogsDetailDto, ICatalogsDetailDtoOptions } from "../dto/catalogs-detail.dto";
import { AbstractEntity } from "src/shared/common/abstract.entity";
import { TranslationDto } from "src/shared/common/translation.dto";
import { generateRandomCode } from "src/shared/common/utils";
import { CatalogsEntity } from "./catalogs.entity";

@Entity({ name: 'catalogs-detail' })
@Index('idx_catalogs_detail_id', ['id'])
@Index('idx_catalogs_detail', ['name', 'slug', 'index', 'isActive'])
@UseDto(CatalogsDetailDto)
export class CatalogsDetailEntity extends AbstractEntity<CatalogsDetailDto, ICatalogsDetailDtoOptions> {
  @Column({ unique: true, default: generateRandomCode(5, false).toUpperCase() })
  code: string;

  @Column({ type: 'jsonb' })
  name: TranslationDto;

  @Column()
  slug: string;

  @Column({ type: 'real', default: 1.001 })
  index: number;

  @ManyToOne(() => CatalogsEntity, (catalog) => catalog.catalogsDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  
  @JoinColumn({ name: 'catalog_id' })
  catalog: CatalogsEntity;


  @Column({ default: true })
  isActive: boolean;
}
