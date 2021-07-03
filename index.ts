import { FastifyPluginCallback, FastifySchema } from "fastify";
import fp from "fastify-plugin";
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

const createYupValidatorCompiler =
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

const fastifyYupSchemaPlugin: FastifyPluginCallback<YupOptions> = (
  fastify,
  options,
  done
) => {
  const yupValidatorCompiler = createYupValidatorCompiler(options);
  fastify.setValidatorCompiler(yupValidatorCompiler);
  done();
};

export const fastifyYupSchema = fp(fastifyYupSchemaPlugin);

export const createYupSchema = (callBack: CreateYupSchemaCallback) =>
  callBack(yup);
