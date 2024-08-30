import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";
interface User {
    username: string;
    email: string;
    password: string;
    avatar: string;
    todos: [];
}

let userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    todos: [],
});

userSchema.pre("save", function (next) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

const User = model<User>("Users", userSchema);

export default User;
