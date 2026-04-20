const zod = require("zod");

const companiesSchema = zod.object({
  name: zod.string().min(1),
  contact: zod.string(),
  country: zod.string(),
  phone: zod.number(),
  email: zod.email().min(1),
  website: zod.string(),
});

module.exports = { companiesSchema };
