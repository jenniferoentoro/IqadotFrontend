import Joi from "joi"

export const staticSchema = Joi.object({
    channel : Joi.any().invalid("label").required().messages({
        "any.invalid": "Channel is required"
    }),
    subject: Joi.string().required().messages({
       "string.empty": "Subject is required"
    }),
    body: Joi.string().required().messages({
        "string.empty": "Question is required"
    }),
    answer: Joi.string().required().messages({
        "string.empty": "Answer is required"
    }),
    publish: Joi.boolean(),
})