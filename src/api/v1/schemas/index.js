import Joi from 'joi';

export default {
  'POST /v1/notes': Joi.object({
    query: Joi.object({
      title: Joi.string().required(),
      message: Joi.string().required(),
    }),
  }),
};
