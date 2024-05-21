import { userRepository } from "../../../domain/ports/userRepository.js";
import { User } from "./entities/user.js";

export class MongoUserRepository extends userRepository{

    async save(user){
        const userModel = new User(user);
        await userModel.save();
        return user;
    }
 
    async findUserByEmail(email){
        const emailLower = email.toLowerCase();
        return await User.findOne({ email: emailLower });
    }

    async findUserById(userId){
        return await User.findById(userId).select("-password");
    }

    async findUserByIdWithRole(userId){
        return await User.findById(userId)
            .select('-password')
            .populate('role');
    }
    async findAll(userId){
        return await User.find({ _id: { $ne: userId } }).select("-password");
    }

}

