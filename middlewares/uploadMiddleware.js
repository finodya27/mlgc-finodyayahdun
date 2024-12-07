const Joi = require("joi");

const uploadMiddleware = {
  payload: {
    maxBytes: 1000000,
    output: 'stream',
    parse: true,
    allow: 'image/*',
  },
  validate: {
    payload: Joi.object({
      file: Joi.object().required()
    })
  }
};

module.exports = { uploadMiddleware };
