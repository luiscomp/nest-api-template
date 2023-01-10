import DataResponse from 'src/utils/response/DataResponse';
import PageResponse from 'src/utils/response/PageResponse';
import PlayerService from '../service/PlayerService';
import { CreatePlayerDto } from 'src/generated/player/dto/create-player.dto';
import { Player } from 'src/generated/player/entities/player.entity';
import { UpdatePlayerDto } from 'src/generated/player/dto/update-player.dto';
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
import PlayerSchema from '../schemas/PlayerSchema';
import { IdParamPipe } from '../pipes/ParamRequiredPipe';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPageResponse } from '../decorators/ApiPageResponse';
import { ApiDataResponse } from '../decorators/ApiDataResponse';
import { ApiDataCreateResponse } from '../decorators/ApiDataCreateResponse';

@ApiTags('Player')
@Controller('api/v1/players')
export default class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List a page of players.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiPageResponse({ type: Player })
  @UseInterceptors(ClassSerializerInterceptor)
  async listPage(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<PageResponse<Player>> {
    const response = new PageResponse<Player>();
    response.list = await this.playerService.listar(page, pageSize);
    response.page = Number(page);
    response.pageSize = Number(pageSize);
    response.total = await this.playerService.count();

    return response;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a player' })
  @ApiParam({ name: 'id', required: true })
  @ApiDataResponse({ type: Player })
  async find(
    @Param('id', IdParamPipe) id: string,
    @I18n() i18n: I18nContext,
  ): Promise<DataResponse<Player>> {
    const response = new DataResponse<Player>();
    response.data = await this.playerService.find(id, i18n);
    return response;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a player.' })
  @ApiDataCreateResponse({ type: Player })
  @UsePipes(new SchemaValidationPipe(PlayerSchema.create))
  async create(
    @Body() player: CreatePlayerDto,
    @I18n() i18n: I18nContext,
  ): Promise<DataResponse<Player>> {
    const response = new DataResponse<Player>();
    response.data = await this.playerService.create(player, i18n);
    return response;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a player.' })
  @ApiParam({ name: 'id', required: true })
  @ApiDataResponse({ type: Player })
  @UsePipes(new SchemaValidationPipe(PlayerSchema.update))
  async update(
    @Param('id') id: string,
    @Body() player: UpdatePlayerDto,
    @I18n() i18n: I18nContext,
  ): Promise<DataResponse<Player>> {
    const response = new DataResponse<Player>();
    response.data = await this.playerService.atualizar(id, player, i18n);
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a player.' })
  @ApiParam({ name: 'id', required: true })
  @ApiDataResponse({ type: Player })
  async delete(@Param('id') id: string): Promise<DataResponse<Player>> {
    const response = new DataResponse<Player>();
    response.data = await this.playerService.deletar(id);
    return response;
  }
}
