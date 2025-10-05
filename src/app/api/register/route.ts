import type { QueryResult } from "pg";
import connectionPool from "../../../../db";
import bcryptjs from "bcryptjs";
import type { NextRequest } from "next/server";
import { sendConfirmationEmailAndInsertIntoDatabase } from "../templates/send-code";

type propsConfirmUser = {
    identification: string | null;
    email: string | null;
};

type propsCreateUser = {
    passwordUser: string;
    name: string;
    username: string;
    emailUser: string;
};

const confirmUser = async (props: propsConfirmUser) => {
    //check if the required inputs are send, it is a validation input
    if (!props.identification || !props.email) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exist",
        };
    }

    //check data in users table
    const checkUser = await connectionPool.query(
        `SELECT u.user_email, ud.state_id FROM public.user AS u 
    INNER JOIN user_data AS ud ON ud.user_id = u.user_id 
    WHERE ud.user_data_id = $1 LIMIT 1;`,
        [props.identification]
    );
    //check if return some data to check if the email exist
    if (!checkUser.rowCount) {
        return {
            ok: false,
            code: 401,
            information: "It doesn't exist that user",
        };
    }

    if (checkUser.rows[0].email !== props.email) {
        return {
            ok: false,
            code: 401,
            information: "The data it doesn't match, please don't modify the link",
        };
    }

    if (checkUser.rows[0].state_id !== 2) {
        return {
            ok: false,
            code: 401,
            information:
                "You can't verify the user because, or it is verified or it is deleted",
        };
    }

    const updateUserData = await connectionPool.query(
        "UPDATE user_data SET state_id = 1 WHERE user_data_id = $1;",
        [props.identification]
    );

    if (updateUserData.rowCount) {
        return {
            ok: false,
            code: 201,
            information: "User verified",
        };
    }
    return {
        ok: false,
        code: 401,
        information: "It doesn't exist that user",
    };
};

const addUser = async (request: Request) => {
    //check if the required inputs are send, it is a validation input
    const { username, name, email, password, repeat } = await request.json();
    if (!username || !name || !email || !password || !repeat) {
        return {
            ok: false,
            code: 400,
            information: { name: "", email: "Some data required doesn't exist" },
        };
    }

    if (password !== repeat) {
        return {
            ok: false,
            code: 401,
            information: { name: "", email: "The passwords are not the same" },
        };
    }

    //check if the email already exist in the database
    const resultEmail = await checkEmail(email);
    if (resultEmail) {
        return resultEmail;
    }

    //add the data into the database, users
    const userId = await createUser({
        passwordUser: password,
        username: username,
        name: name,
        emailUser: email,
    });
    //and later users_data
    const userDataId = await createUserData(userId);

    //send the email confirmation to verify the account
    await sendConfirmationEmailAndInsertIntoDatabase(userDataId, email, name);

    return {
        ok: true,
        code: 201,
        information: { name: name, email: email },
    };
};

const checkEmail = async (email: string) => {
    //extract data from database
    const checkEmail = await connectionPool.query(
        "SELECT user_id FROM public.user WHERE user_email = $1 LIMIT 1;",
        [email]
    );
    //check if return some data to check if the email exist
    if (checkEmail.rowCount) {
        return {
            ok: false,
            code: 401,
            information: { name: "", email: "The email is already take it" },
        };
    }
    return null;
};

const createUser = async (props: propsCreateUser) => {
    const hashedPassword = await bcryptjs.hash(props.passwordUser, 10);
    const userId = await connectionPool.query(
        `
    INSERT INTO public.user (user_username, user_name, user_email, user_password) 
    VALUES ($1,$2,$3,$4)
    RETURNING user_id;`,
        [props.username, props.name, props.emailUser, hashedPassword]
    );

    return userId.rows[0].user_id;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const createUserData = async (userId: QueryResult<any>) => {
    const userDataId = await connectionPool.query(
        `
    INSERT INTO user_data (user_id, role_id, state_id) 
    VALUES ($1, 1, 2)
    RETURNING user_data_id;`,
        [userId]
    );
    return userDataId.rows[0].user_data_id;
};

export async function GET(req: NextRequest) {
    const identification = req.nextUrl.searchParams.get("identification");
    const email = req.nextUrl.searchParams.get("email");

    try {
        const data = await confirmUser({
            identification: identification,
            email: email,
        });
        return Response.json({ message: data.information }, { status: 201 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await addUser(request);
        return Response.json(
            {
                ok: data.ok,
                result: { data: data.information },
                code: data.code,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
