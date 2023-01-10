import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import DataResponse from 'src/utils/response/DataResponse';

export const ApiDataCreateResponse = <TModel extends Type<any>>(props: {
  description?: string;
  type: TModel;
}) => {
  return applyDecorators(
    ApiExtraModels(DataResponse, props.type),
    ApiCreatedResponse({
      description: props.description,
      schema: {
        title: `${DataResponse.name}<${props.type.name}>`,
        allOf: [
          { $ref: getSchemaPath(DataResponse) },
          {
            properties: {
              statusCode: {
                example: HttpStatus.CREATED,
              },
              data: {
                type: typeof props.type,
                $ref: getSchemaPath(props.type),
              },
            },
          },
        ],
      },
    }),
  );
};
