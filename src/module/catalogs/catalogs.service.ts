import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogsEntity } from './entities/catalogs.entity';
import { CatalogsDetailEntity } from './entities/catalog-detail.entity';
import { CatalogsDto } from './dto/catalogs.dto';

@Injectable()
export class CatalogsService {
    constructor(
      @InjectRepository(CatalogsEntity)
      private readonly catalogsRepository: Repository<CatalogsEntity>,
      @InjectRepository(CatalogsDetailEntity)
      private readonly catalogsDetailRepository: Repository<CatalogsDetailEntity>,
      ) {}
      
    async getlistCatalogsDto(): Promise<CatalogsEntity[]> {
        return this.catalogsRepository.find();
      }

    async createStudentCourse(createStudentCourse: {slug: string}): Promise<void> {
      
      const entity = await this.catalogsDetailRepository
      .createQueryBuilder('catalogs')
      .select('code, name , slug,  catalogs.*',)
      .leftJoin('catalogs.id','catalogs',)
      .getRawMany();

      console.log(entity);
         //const student = await this.catalogsDetailRepository.findOne({where: {slug: createStudentCourse.slug}});
       return null; 
      }

    async getJoinColumnCatalogs(slug: string): Promise<CatalogsDetailEntity[]> {
      const catalogsDetail = await this.catalogsDetailRepository
      .createQueryBuilder('catalogs')
      .leftJoinAndSelect("catalogs", "catalog-detail")
      .where('catalogs.slug = :slug', { slug })
      .select(['catalogs.code', 'catalogs.name'])
      .getMany();
      const codes = catalogsDetail.map((item) => item.name);
      console.log(codes);
      return catalogsDetail;


      // const catalogsDetail = await this.catalogsDetailRepository
      // .createQueryBuilder('catalogs')
      // .leftJoinAndSelect("question.categories", "category")
      // .where('catalogs.slug = :slug', { slug })
      // .select(['catalogs.code', 'catalogs.name'])
      // .getMany();
      // const codes = catalogsDetail.map((item) => item.code);
      // console.log(catalogsDetail);
      // return catalogsDetail;
    }
}
