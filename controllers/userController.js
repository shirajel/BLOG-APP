const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            message: 'Users fetched successfully',
            success: true,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getAllUsers callback',
            error
        });
    }
};

// Register user
const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'Please provide all required fields',
                success: false
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: 'User already exists',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).send({
            message: 'User created successfully',
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            error
        });
    }
};

// Login user
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: 'Please provide email and password',
                success: false
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                message: 'User not registered',
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        });
    }
};

module.exports = {
    getAllUsers,
    registerController,
    loginController
};
