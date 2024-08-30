import {getServerSession} from "#auth";
import {connect} from "mongoose";
import User from "../../../model/User";

export default eventHandler(async (event) => {
    const session = await getServerSession(event);
    let user: any;
    if (session) {
        user = session.user;
    }
    await connect(process.env.MONGO_URL);
    let $foundUser = await User.findOne({
        email: user.email,
    });
    if ($foundUser) {
        const {_doc}: any = $foundUser;
        const {username, todos, avatar} = _doc;
        return {username, todos, avatar};
    }
    let $newUser = await User.create({
        email: user.email,
        username: user.name,
        password: session?.expires,
        avatar: user.image,
        todos: [],
    });
    const {_doc}: any = $newUser;
    const {username, todos, avatar} = _doc;
    return {username, todos, avatar};
});
