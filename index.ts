import { FastifySchema } from "fastify";
import * as yup from "yup";

export type YupOptions = typeof yupDefaultOptions;

export type CreateYupSchemaCallback = {
  (yupCallback: typeof yup): FastifySchema;
};

const yupDefaultOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true,
};

export const createYupValidatorCompiler =
  (yupOptions: YupOptions = yupDefaultOptions) =>
  ({ schema }: any) =>
  (data: any) => {
    try {
      const result = schema.validateSync(data, yupOptions);
      return { value: result };
    } catch (error) {
      return { error };
    }
  };

export const createYupSchema = (callBack: CreateYupSchemaCallback) =>
  callBack(yup);
