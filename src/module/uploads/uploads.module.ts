import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { CatalogsDto } from '../catalogs/dto/catalogs.dto';
import { CatalogsEntity } from '../catalogs/entities/catalogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogsEntity])],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
