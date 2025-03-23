const AppDataSource = require("../config/database");
const { hashPassword, comparePassword } = require("../utils/hash");
const { secret, expiresIn } = require("../config/jwt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../entities/User"); 

const userList = AppDataSource.getRepository(User);


const registerUser = async ({ username, email, password }) => {
    try {
        if (!username || !email || !password) {
            return { status: 400, message: "Name, email, and password are required" };
        }

        const existingUserCheck = await userList.findOne({ where: { email } });
        if (existingUserCheck) {
            return { status: 409, message: "User already exists" };
        }

        const hashThePassword = await hashPassword(password);
        if (!hashThePassword) {
            return { status: 500, message: "Error hashing password" };
        }

        const createUser = userList.create({ username, email, password: hashThePassword });
        await userList.save(createUser);

        return { status: 201, message: "User created successfully" };
    } catch (error) {
        console.error("Error in registerUser:", error);
        return { status: 500, message: "Internal server error" };
    }
};

const loginUser = async ({ email, password }) => {
    try {
        const user = await userList.findOne({ where: { email } });
        console.log("User fetched from DB:", user); 
        if (!user) {
            return { status: 401, message: "Invalid email or password" };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { status: 401, message: "Invalid email or password" };
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });

        return { status: 200, token };
    } catch (error) {
        console.error("Error in loginUser:", error);
        return { status: 500, message: "Internal server error" };
    }
};

module.exports = { registerUser, loginUser };