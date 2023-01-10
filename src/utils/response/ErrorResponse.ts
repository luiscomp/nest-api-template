import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { I18nContext } from 'nestjs-i18n';

export default class ErrorResponse {
  @ApiProperty()
  public statusCode: number;
  @ApiProperty()
  public errors: string[];
  @ApiProperty()
  public timestamp: string;
  @ApiProperty()
  public path: string;
  @ApiProperty()
  public lang: string;

  constructor(error: HttpException, url: string, i18n: I18nContext) {
    const message = error.getResponse()['message'];

    this.statusCode = error.getStatus();
    this.errors = typeof message === 'object' ? message : [message];
    this.timestamp = new Date().toISOString();
    this.path = url;
    this.lang = i18n.lang;
  }
}
