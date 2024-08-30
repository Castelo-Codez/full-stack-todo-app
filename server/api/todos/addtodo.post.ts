import {connect} from "mongoose";
import User from "../../../model/User";
import {getServerSession} from "#auth";
export default defineEventHandler(async (event) => {
    let $getcurrentUser = await getServerSession(event);
    let $body = await readBody(event);
    await connect(process.env.MONGO_URL);
    await User.updateOne(
        {
            email: $getcurrentUser?.user?.email,
        },
        {
            $push: {
                todos: $body,
            },
        }
    )
       
});
