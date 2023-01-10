import DataResponse from 'src/utils/response/DataResponse';
import PageResponse from 'src/utils/response/PageResponse';
import CategoryService from '../service/CategoryService';
import { CreateCategoryDto } from 'src/generated/category/dto/create-category.dto';
import { Category } from 'src/generated/category/entities/category.entity';
import { UpdateCategoryDto } from 'src/generated/category/dto/update-category.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SchemaValidationPipe } from '../pipes/SchemaValidationPipe';
import CategorySchema from '../schemas/CategorySchema';
import { IdParamPipe } from '../pipes/ParamRequiredPipe';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../decorators/ApiDataResponse';

@ApiTags('Category')
@Controller('api/v1/categories')
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async listPage(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<PageResponse<Category>> {
    const response = new PageResponse<Category>();
    response.list = await this.categoryService.listar(page, pageSize);
    response.page = Number(page);
    response.pageSize = Number(pageSize);
    response.total = await this.categoryService.quantidadeLista();

    return response;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiDataResponse({ type: Category })
  async find(
    @Param('id', IdParamPipe) id: string,
    @I18n() i18n: I18nContext,
  ): Promise<DataResponse<Category>> {
    const response = new DataResponse<Category>();
    response.data = await this.categoryService.find(id, i18n);
    return response;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new SchemaValidationPipe(CategorySchema.create))
  async create(
    @Body() category: CreateCategoryDto,
  ): Promise<DataResponse<Category>> {
    const response = new DataResponse<Category>();
    response.data = await this.categoryService.create(category);
    return response;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new SchemaValidationPipe(CategorySchema.update))
  async update(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<DataResponse<Category>> {
    const response = new DataResponse<Category>();
    response.data = await this.categoryService.atualizar(id, category);
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DataResponse<Category>> {
    const response = new DataResponse<Category>();
    response.data = await this.categoryService.deletar(id);
    return response;
  }
}
