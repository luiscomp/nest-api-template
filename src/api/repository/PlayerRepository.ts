import { Injectable } from '@nestjs/common';
import { Player, Prisma, PrismaService } from 'src/modules/prisma';

@Injectable()
export default class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPage(page: number, pageSize: number): Promise<Player[]> {
    return this.prisma.player.findMany({
      skip: (page - 1) * pageSize,
      take: Number(pageSize),
    });
  }

  async count(): Promise<number> {
    return this.prisma.player.count();
  }

  async findById(id: string): Promise<Player> {
    return this.prisma.player.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.player.findUnique({
      where: { email },
    });
  }

  async findByEmailAndIdNot(email: string, id: string): Promise<Player> {
    return this.prisma.player.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
        ],
        NOT: { id: { equals: id } },
      },
    });
  }

  async create(player: Prisma.PlayerCreateInput): Promise<Player> {
    return this.prisma.player.create({
      data: player,
    });
  }

  async update(id: string, player: Prisma.PlayerUpdateInput): Promise<Player> {
    return this.prisma.player.update({
      where: { id },
      data: player,
    });
  }

  async delete(id: string): Promise<Player> {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
