import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import DataResponse from 'src/utils/response/DataResponse';

export const ApiDataResponse = <TModel extends Type<any>>(props: {
  description?: string;
  statusCode?: HttpStatus;
  type: TModel;
}) => {
  return applyDecorators(
    ApiExtraModels(DataResponse, props.type),
    ApiOkResponse({
      description: props.description,
      schema: {
        title: `${DataResponse.name}<${props.type.name}>`,
        allOf: [
          { $ref: getSchemaPath(DataResponse) },
          {
            properties: {
              statusCode: {
                example: props.statusCode ?? HttpStatus.OK,
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
