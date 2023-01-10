import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { AnyObjectSchema } from 'yup';

export class SchemaValidationPipe implements PipeTransform {
  constructor(private readonly schema: AnyObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body')
      try {
        this.schema.validateSync(value, { abortEarly: false });
        return value;
      } catch (error) {
        const errors: Array<string> = [];

        for (const message of error.errors) {
          errors.push(message.replace(/['"]+/g, "'"));
        }

        throw new BadRequestException({ message: errors });
      }
  }
}
