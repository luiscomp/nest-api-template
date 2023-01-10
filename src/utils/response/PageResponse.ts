import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class PageResponse<T> {
  @ApiProperty()
  public total: number;
  @ApiProperty()
  public page: number;
  @ApiProperty()
  public pageSize: number;
  @ApiProperty()
  public statusCode: number = HttpStatus.OK;

  public list: Array<T>;

  constructor(statusCode: number = HttpStatus.OK) {
    this.statusCode = statusCode;
  }

  @Expose()
  @ApiProperty()
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }
}
