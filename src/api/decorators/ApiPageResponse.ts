import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import PageResponse from 'src/utils/response/PageResponse';

export const ApiPageResponse = <TModel extends Type<any>>(props: {
  description?: string;
  type: TModel;
}) => {
  return applyDecorators(
    ApiExtraModels(PageResponse, props.type),
    ApiOkResponse({
      description: props.description,
      schema: {
        title: `${PageResponse.name}<${props.type.name}>`,
        allOf: [
          { $ref: getSchemaPath(PageResponse) },
          {
            properties: {
              list: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(props.type),
                },
              },
            },
          },
        ],
      },
    }),
  );
};
