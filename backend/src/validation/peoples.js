const zod = require("zod")

const peoplesSchema = zod.object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    company: zod.string(),
    country: zod.string(),
    phone: zod.string().min(7), 
    email: zod.string().email(),  
})

module.exports = { peoplesSchema };