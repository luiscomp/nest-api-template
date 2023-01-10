import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class IdParamPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param')
      (!!value && isNaN(value)) || this.badRequest();
    return value;
  }

  badRequest() {
    throw new BadRequestException({
      message: ['Invalid ID'],
    });
  }
}
