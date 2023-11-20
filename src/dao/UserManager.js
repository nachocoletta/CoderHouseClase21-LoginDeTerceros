import UserModel from "../models/user.model.js";
import { Exception } from '../helpers/utils.js';

export default class UserManager {
    static async get(query = {}) {
        const criteria = {};
        const result = await UserModel.find(query)
        // console.log("result", result);
        return result
    }

    static async getByMail(email) {

        const result = await UserModel.findOne({ email })
        // console.log("result", result)
        return result
    }
    static async getById(uid) {
        const user = await UserModel.findById(uid);
        if (!user) {
            throw new Exception('No existe el usuario', 404)
        }
        return user;
    }

    static async create(newUser = {}) {
        try {
            const user = await UserModel.create(newUser)
            return user;
        } catch (error) {
            console.error('Error al crear el usuario', error.message)
            throw new Exception("No se pudo crear el usuario ", 500);
        }
    }
}