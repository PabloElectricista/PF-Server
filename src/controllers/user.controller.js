import User from "../models/User.js";
import Role from "../models/Role.js";
<<<<<<< HEAD
import {authMail} from './nodemailer/send-mail.js'
=======
import jwt_decode from "jwt-decode";

>>>>>>> c5bc5a805a8a4efb3e64d26504491c61bb3b2674
export const createUser = async (req, res) => {
    try {
        const { credential } = req.body;
        const userdata = jwt_decode(credential);
        if(!userdata.email_verified) return res.status(403);

        const username = `${userdata.given_name}${userdata.family_name}`
        const email = `${userdata.email}`
        const userExist = await checkExistingUser(username, email)

        if (!!userExist) {
            return res.status(200).json(userExist);
        }
        
        const rolesFound = await Role.find({ name: "user" });
        const password = await User.encryptPassword("12345678");
        // creating a new User
        const user = new User({
            username,
            email,
            password,
            picture: userdata.picture,
            roles: rolesFound.map((role) => role._id),
        });

        // saving the new user
        let savedUser = await user.save();
        savedUser.password = ""
        savedUser.roles = "user"

<<<<<<< HEAD
    // saving the new user
    const savedUser = await user.save();

    await authMail(email,username)

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
=======
        return res.status(200).json(savedUser);
    } catch (error) {
        return
    }
>>>>>>> c5bc5a805a8a4efb3e64d26504491c61bb3b2674
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        return res.json(user);
    } catch (error) {
        return
    }
};

export const getUserEmail = async (req, res) => {
    try {
        const { email } = req.params
        const user = await User.find({ email: email })
        return res.json(user)
    } catch (error) {
        return
    }
};

export const putUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        await User.updateOne({ email: email },
            { username: username },
            { password: password }
        )
        return res.status(200).send("User updated!")
    } catch (error) {
        return
    }
}

const checkExistingUser = async (username, email) => {
    try {
        const userFound = await User.findOne({ username })
            .select('-password')
            .populate({ path: "roles", select: "name -_id" })
        if (userFound) return userFound
        const emailfound = await User.findOne({ email })
            .select('-password')
            .populate({ path: "roles", select: "name -_id" })
        if (emailfound) return emailfound
        else return []
    } catch (error) {
        return error.message;
    }
};
