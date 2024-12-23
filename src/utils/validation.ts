import * as Joi from 'joi';

export const validation: Joi.Schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('test', 'local', 'development', 'production')
    .required(),
  SERVER_PORT: Joi.number().required(),
}).options({
  abortEarly: true,
});
