import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      }
    ],
    shopping: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Order"
    }],
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    firstName: {
      type: String
    },
    lastName: {
      type:String
    },
    phone: {
      type: Number
    },
    identificationnumber:{
      type: Number
    },
    address: {
      type: String
    },
    addressnumber: {
      type: Number
    },
    floor:{
      type: Number
    },
    department: {
      type: String
    },
    zipcode: {
      type: Number
    },
    city: {
      type: String
    },
    zipcode: {
      type: Number
    },
    city:{
      type: String
    },
    state:{
      type: String
    },
    country:{
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

productSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
})

export default mongoose.model("User", productSchema);
