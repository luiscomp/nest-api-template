import { Module } from '@nestjs/common';
import { PlayerModule } from './api/modules/PlayerModule';
import { PrismaModule } from './modules/prisma';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { CategoryModule } from './api/modules/CategoryModule';

@Module({
  imports: [
    PlayerModule,
    CategoryModule,
    PrismaModule,
    I18nModule.forRoot({
      fallbackLanguage: 'pt-BR',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
