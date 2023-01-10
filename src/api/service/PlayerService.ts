import PlayerRepository from '../repository/PlayerRepository';
import { BusinessException } from '../config/exceptions/BusinessException';
import { CreatePlayerDto } from 'src/generated/player/dto/create-player.dto';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Player } from 'src/generated/player/entities/player.entity';
import { UpdatePlayerDto } from 'src/generated/player/dto/update-player.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export default class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async listar(page: number, pageSize: number): Promise<Player[]> {
    return this.playerRepository.findPage(page, pageSize);
  }

  async find(id: string, i18n: I18nContext): Promise<Player> {
    const player = await this.playerRepository.findById(id);

    if (!player) {
      throw new NotFoundException(i18n.t('player.not_found'));
    }

    return player;
  }

  async count(): Promise<number> {
    return this.playerRepository.count();
  }

  async create(player: CreatePlayerDto, i18n: I18nContext): Promise<Player> {
    await this.checkUserByEmail(player.email, i18n);
    return this.playerRepository.create(player);
  }

  async atualizar(
    id: string,
    player: UpdatePlayerDto,
    i18n: I18nContext,
  ): Promise<Player> {
    await this.checkUserByEmailAndIdNotEqual(player.email, id, i18n);
    return this.playerRepository.update(id, player);
  }

  async checkUserByEmail(email: string, i18n: I18nContext) {
    const player = await this.playerRepository.findByEmail(email);
    this.checkIfExistPlayer(player, i18n);
  }

  async checkUserByEmailAndIdNotEqual(
    email: string,
    id: string,
    i18n: I18nContext,
  ) {
    const player = await this.playerRepository.findByEmailAndIdNot(email, id);
    this.checkIfExistPlayer(player, i18n);
  }

  checkIfExistPlayer(player: Player, i18n: I18nContext) {
    if (player) {
      throw new BusinessException(
        i18n.t('player.email_already_exists'),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deletar(id: string): Promise<Player> {
    return this.playerRepository.delete(id);
  }
}
