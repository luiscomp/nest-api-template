import CategoryRepository from '../repository/CategoryRepository';
import { CreateCategoryDto } from 'src/generated/category/dto/create-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/generated/category/entities/category.entity';
import { UpdateCategoryDto } from 'src/generated/category/dto/update-category.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export default class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async listar(page: number, pageSize: number): Promise<Category[]> {
    return this.categoryRepository.findPage(page, pageSize);
  }

  async find(id: string, i18n: I18nContext): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException(i18n.t('category.not_found'));
    }

    return category;
  }

  async quantidadeLista(): Promise<number> {
    return this.categoryRepository.count();
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(category);
  }

  async atualizar(id: string, category: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.update(id, category);
  }

  async deletar(id: string): Promise<Category> {
    return this.categoryRepository.delete(id);
  }
}
