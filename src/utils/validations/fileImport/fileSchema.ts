import Joi from "joi"

export const fileSchema = Joi.object({
    channel: Joi.any().invalid("label").required().messages({
        "any.invalid": "Channel is required"
    }),
    file: Joi.any(),
    publish: Joi.boolean()
})