import {connect} from "mongoose";
import User from "../../../model/User";
export default defineEventHandler(async (event) => {
    let $body = await readBody(event);
    await connect(process.env.MONGO_URL);
    await User.updateOne(
        {
            "todos.id": $body.id,
        },
        {
            $set: {
                "todos.$.done": $body.status,
            },
        }
    );
});
