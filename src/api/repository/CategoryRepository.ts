import { Injectable } from '@nestjs/common';
import { Category, Prisma, PrismaService } from 'src/modules/prisma';

@Injectable()
export default class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPage(page: number, pageSize: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      skip: (page - 1) * pageSize,
      take: Number(pageSize),
    });
  }

  async count(): Promise<number> {
    return this.prisma.category.count();
  }

  async findById(id: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data: category,
    });
  }

  async update(
    id: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: category,
    });
  }

  async delete(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
