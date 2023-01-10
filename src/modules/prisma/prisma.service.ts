import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    const oldDate = new Date();
    await this.$connect().then(() => {
      console.log(
        `\x1b[32m[Data] ${
          process.pid
        }  - \x1b[37m${new Date().toLocaleString()}     \x1b[32mLOG \x1b[33m[Prisma Connection] \x1b[32mPrisma database connected \x1b[33m+${Math.abs(
          (new Date().getTime() - oldDate.getTime()) % 1000,
        )}ms`,
      );
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
