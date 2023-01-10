import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class DataResponse<T> {
  @ApiProperty()
  public message: string;
  public data: T;
  constructor(public statusCode: number = HttpStatus.OK) {}
}
