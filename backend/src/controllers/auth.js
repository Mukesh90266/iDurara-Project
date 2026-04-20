const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signupSchema, loginSchema } = require("../validation/auth");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
  try {
    const body = req.body;

    const parsedBody = signupSchema.safeParse(body);

    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        msg: "Invalid data",
        errors: parsedBody.error.issues,
      });
    }

    const { name, email, password, country } = parsedBody.data;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      country,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      msg: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "User can't be registered. Please try again",
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const body = req.body;

    const parsedBody = loginSchema.safeParse(body);

    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
        errors: parsedBody.error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    const { email, password } = parsedBody.data;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist. Please signup first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect password",
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "Failed to login. Please try again.",
    });
  }
};

module.exports = {
  signup,
  login,
};
