import joi from 'joi';

export const signUpvalidation=joi.object({
    username:joi.string().min(3),
    email:joi.string().required().email(),
    password:joi.string().required().min(4)
})