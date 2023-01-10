
import {ApiExtraModels} from '@nestjs/swagger'
import {ConnectCategoryDto} from '../../category/dto/connect-category.dto'

export class CreatePlayerCategoryRelationInputDto {
    connect: ConnectCategoryDto;
  }

@ApiExtraModels(ConnectCategoryDto,CreatePlayerCategoryRelationInputDto)
export class CreatePlayerDto {
  name: string;
email: string;
phone: string;
ranking?: string;
rankPosition?: number;
urlPhoto?: string;
category: CreatePlayerCategoryRelationInputDto;
created_at?: Date;
}
