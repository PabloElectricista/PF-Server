import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, picture, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      picture,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      picture: savedUser.picture,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch(error) {
    console.log(error)
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id);
    return res.json(user);
  } catch(error) {
    console.log(error)
  }
};

export const getUserEmail = async (req, res) => {
  try {
    const { email } = req.params
    const user = await User.find({email: email})
    return res.json(user)
  } catch(error) {
    console.log(error)
  }
};

export const putUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    await User.updateOne({email: email},
      {username: username},
      {password: password}
      )
    return res.status(200).send("User updated!")
  } catch(error) {
    console.log(error)
  }
}
