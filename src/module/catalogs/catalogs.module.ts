import { Module } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogsEntity } from './entities/catalogs.entity';
import { CatalogsDetailEntity } from './entities/catalog-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogsEntity, CatalogsDetailEntity])],
  controllers: [CatalogsController],
  providers: [CatalogsService],
})
export class CatalogsModule {}
