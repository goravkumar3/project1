const Joi=require('joi')
const validater = Joi.object({
  fullname: Joi.string()
    .required()
    .min(3)
    .max(20)
    .messages({
      "string.base": "fullname must be string",
      "string.empty": "fullname can't be empty",
      "string.min": "fullname can't be less than 3 length",
      "string.max": "fullname can't be greater than 20 length",
      "any.required": "fullname required",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required()
    .messages({
      "string.base": "email must be string",
      "string.empty": "email can't be empty",
      "string.email": "invalid email",
      "any.required": "email required",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(8)
    .max(20)
    .messages({
      "string.base": "password must be string",
      "string.empty": "password can't be empty",
      "string.min": "password can't be less than 8 length",
      "string.max": "password can't be greater than 20 length",
      "string.pattern":"password must have a number,symbol,alph",
      "any.required": "password required",
    }),
});

module.exports = validater;
