import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "7d";

const userschema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isemailverified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgetpasswordtoken: {
      type: String,
    },
    forgetpasswordexpiry: {
      type: Date,
    },
    emailverificationtoken: {
      type: String,
    },
    emailverificationexpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userschema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userschema.methods.generateAcessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET not defined");
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

userschema.methods.generateRefreshToken = function () {
  if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET not defined");
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

userschema.methods.generateTemporaryToken = function () {
  const unhashestoken = crypto.randomBytes(20).toString("hex");
  const hashedtoken = crypto.createHash("sha256").update(unhashestoken).digest("hex");
  const tokenexpiry = Date.now() + 20 * 60 * 1000;
  return { unhashestoken, hashedtoken, tokenexpiry };
};

const user = mongoose.model("user", userschema);
export { userschema,user };
