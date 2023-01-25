const argon2 = require("argon2");
const user = require("../models/UserModel");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = {
    register: async (req, res, next) => {

        const { fullname, email, phone, address, gender, password } = req.body;

        const passwordHash = await argon2.hash(password);

        const userId = uuidv4();

        try {
            const data = await user.create({
                user_id: userId,
                fullname: fullname,
                email: email,
                phone: phone,
                address: address,
                gender: gender,
                password: passwordHash,
            });

            return res.success('Successfuly', 200, data);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    login: async (req, res, next) => {

        const { email, password } = req.body;

        try {

            const data = await user.findOne({
                where: {
                    email: email
                }
            });

            if (!data) return res.failValidationError("Email tidak ditemukan");

            const match = await argon2.verify(data.password, password);

            if (!match) {
                return res.failValidationError("Password yang anda masukan salah");
            }

            let payload = {
                "authorized": true,
                "user_id": data.user_id,
                "fullname": data.fullname,
                "email": data.email,
                "phone": data.phone,
                "gender": data.gender,
            }

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET)

            return res.success('Successfuly', 200, {
                accessToken: accessToken,
                user: {
                    user_id: data.user_id,
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    gender: data.gender,
                    address: data.address,
                }
            });

        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    }
}