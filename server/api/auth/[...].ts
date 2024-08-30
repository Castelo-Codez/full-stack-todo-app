import {NuxtAuthHandler} from "#auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "~/model/User";
import bcrypt from "bcrypt";
import {connect} from "mongoose";

export default NuxtAuthHandler({
    secret: process.env.AUTH_NO_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        GithubProvider.default({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SEC,
        }),
        // @ts-expect-error Use .default here for it to work during SSR.
        CredentialsProvider.default({
            name: "Credentials",
            credentials: {
                email: {
                    type: "text",
                },
                password: {label: "password", type: "password"},
            },
            async authorize(credentials: {email: string; password: string}) {
                const {email, password} = credentials;
                await connect(process.env.MONGO_URL);
                let userExistOrNot = await User.findOne({email: email});
                if (userExistOrNot) {
                    let checkPassword = bcrypt.compareSync(
                        password,
                        userExistOrNot.password
                    );
                    if (checkPassword) {
                        return {
                            ...{email, password},
                        };
                    }
                    throw createError({
                        statusMessage: "invalid+password",
                        statusCode: 401,
                    });
                }
                throw createError({
                    statusMessage: `email+is+not+found`,
                    statusCode: 401,
                });
            },
        }),
    ],
});
