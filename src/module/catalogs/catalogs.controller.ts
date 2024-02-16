import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';


@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}
 
  @Public()
  @Get()
  async getlistCatalog() {
    return this.catalogsService.getlistCatalogsDto();
  }

  @Public()
  @Get('JoinColumn/:slug')
  async getJoinColumnCatalog(@Param('slug') slug: string) {
    return this.catalogsService.getJoinColumnCatalogs(slug);
  }

  @Public()
  @Post('slug')
  async createStudentCourse(@Body() createStudentCourse: {slug: string}) {
   await this.catalogsService.createStudentCourse(createStudentCourse);
  }
}
