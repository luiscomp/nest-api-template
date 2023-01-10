import PlayerController from '../controller/PlayerController';
import PlayerRepository from '../repository/PlayerRepository';
import PlayerService from '../service/PlayerService';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepository],
})
export class PlayerModule {}
