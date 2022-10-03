import User from "../models/User.js";
import Role from "../models/Role.js";
import { authMail } from './nodemailer/send-mail.js'
import jwt_decode from "jwt-decode";


export const createUser = async (req, res, next) => {
    try {
        const { credential } = req.body;
        if( !credential) return res.status(401);
        const userdata = jwt_decode(credential);
        if (!userdata.email_verified) return res.status(403);
        const username = `${userdata.given_name}${userdata.family_name}`
        const email = `${userdata.email}`
        const userExist = await checkExistingUser(username, email)
        
        if (userExist && userExist.isActive) {
            return res.status(200).json(userExist);
        }
        
        const rolesFound = await Role.find({ name: "user" });
        const password = await User.encryptPassword("12345678");
        // creating a new User
        const user = new User({
            ...req.body,
            username,
            email,
            password,
            picture: userdata.picture,
            roles: rolesFound.map((role) => role._id)
        });

        // saving the new user
        let savedUser = await user.save();
        savedUser.password = ""
        savedUser.roles = "user"
        await authMail(email, username)
        return res.status(200).json(savedUser);
    } catch (error) {
        return next(error)
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const {start}= req.query
        const index = start * 20 +1
        const users = await User.find().skip(index).limit(20).populate("shopping");
        const count = await User.countDocuments();
        return res.json({users,count});
    } catch (error) {
        next(error)
    }
};
// products = await Product.find(condition).skip(index).limit(limit || 9);

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate("shopping");
        return res.json(user);
    } catch (error) {
        return next(error)
    }
};

export const getUserEmail = async (req, res, next) => {
    try {
        const { email } = req.params
        const user = await User.find({ email: email })
        return res.json(user)
    } catch (error) {
        return next(error)
    }
};

export const putUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).send(user)
    } catch (error) {
        return next(error)
    }
}

const checkExistingUser = async (username, email, next) => {
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
        return next(error)
    }
};
