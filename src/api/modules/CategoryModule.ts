import CategoryController from '../controller/CategoryController';
import CategoryRepository from '../repository/CategoryRepository';
import CategoryService from '../service/CategoryService';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
