import {connect} from "mongoose";
import User from "../../../model/User";

export default defineEventHandler(async (event) => {
    interface Body {
        email: string;
        username: string;
        password: string;
    }
    let $body: Body = await readBody(event);
    await connect(process.env.MONGO_URL);
    try {
        let newUser = await User.create({...$body, avatar: null, todos: []});
        const {_doc}: any = newUser;
        const {email, password} = $body;
        if (_doc.email == email) {
            return {
                email,
                password,
            };
        }
    } catch (error: any) {
        throw createError({
            statusCode: 11000,
        });
    }
});
