import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
class UserService {
    // Método para crear un nuevo usuario
    async createUser(userInput) {
        try {
            // Verificar si el usuario ya existe por su email
            const userExists = await this.findByEmail(userInput.email);
            if (userExists) {
                throw new ReferenceError("User already exists");
            }
            // Encriptar la contraseña del usuario
            userInput.password = await bcrypt.hash(userInput.password, 10);
            // Crear el nuevo usuario
            const user = await UserModel.create(userInput);
            return user;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para iniciar sesión de un usuario
    async login(loginInput) {
        try {
            // Verificar si el usuario existe
            const userExists = await this.findByEmail(loginInput.email);
            if (!userExists) {
                throw new ReferenceError("User doesn't exist");
            }
            // Comparar la contraseña proporcionada con la encriptada
            const isMatch = await bcrypt.compare(loginInput.password, userExists.password);
            if (!isMatch) {
                throw new ReferenceError("User or password incorrect");
            }
            // Generar y devolver un token JWT junto con los datos del usuario
            return { email: userExists.email, id: userExists._id, token: this.generateToken(userExists) };
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para actualizar un usuario
    async update(id, userInput) {
        try {
            // Si se proporciona una nueva contraseña, encriptarla
            if (userInput.password) {
                userInput.password = await bcrypt.hash(userInput.password, 10);
            }
            // Buscar y actualizar el usuario
            const user = await UserModel.findOneAndUpdate({ _id: id }, userInput, { new: true });
            return user;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para eliminar un usuario
    async delete(id) {
        try {
            // Buscar y eliminar al usuario por su ID
            const user = await UserModel.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para obtener todos los usuarios
    async findAll() {
        try {
            // Buscar y devolver todos los usuarios
            const users = await UserModel.find();
            return users;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para encontrar un usuario por su email
    async findByEmail(email) {
        try {
            // Buscar y devolver el usuario por su email
            const user = await UserModel.findOne({ email });
            return user;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para encontrar un usuario por su ID
    async findById(id) {
        console.log(id);
        try {
            // Buscar y devolver el usuario por su ID
            const user = await UserModel.findById(id);
            return user;
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
    // Método para generar un token JWT para un usuario
    generateToken(user) {
        try {
            // Generar y devolver el token JWT con datos del usuario y tiempo de expiración
            return jwt.sign({ id: user._id, email: user.email, name: user.name, rol: user.rol }, process.env.JWT_SECRET || "secret", { expiresIn: "100m" });
        }
        catch (error) {
            throw error; // Lanzar error en caso de fallo
        }
    }
}
export default new UserService;
