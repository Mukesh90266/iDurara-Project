const zod = require("zod");

const signupSchema = zod.object({
  name: zod.string().min(1),
  email: zod.string().email().min(1),
  password: zod.string().min(8),
  country: zod.string()
});

const loginSchema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(8),
});

module.exports = {
  signupSchema,
  loginSchema,
};
