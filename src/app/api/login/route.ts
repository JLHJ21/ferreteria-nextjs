import bcryptjs from "bcryptjs";
import { dataIsEmpty } from "../templates/functions";
import { sendEmailConfirmation } from "../templates/templates";
import connectionPool from "../../../../db";

const checkPassword = async (
    password: string,
    passwordHash: string,
    id: number
) => {
    //check if the password are the same that its saved in the database, using bcryptjs to descrypt that password encrypted
    if (await bcryptjs.compare(password, passwordHash)) {
        return {
            ok: true,
            code: 201,
            information: id,
        };
    }
    //if the password are not the same
    return {
        ok: false,
        code: 401,
        information: "You have entered an invalid username or password",
    };
};

const loginUser = async (request: Request) => {
    const { email, password } = await request.json();
    //check if the required inputs are send, it is a validation input
    if (!email || !password) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exists",
        };
    }
    //extract data from database
    const dataUser = await connectionPool.query(
        "SELECT data.user_data_id, u.first_name, u.password FROM user_data as data INNER JOIN public.user AS u ON u.user_id = data.user_id  WHERE u.email = $1 LIMIT 1",
        [email]
    );

    //check if return some data to check if the user exist
    const result = dataIsEmpty(
        dataUser,
        "You have entered an invalid username or password"
    );
    if (result !== null) {
        return result;
    }

    const user = dataUser.rows[0];

    const resultVerified = await userStatus(user.user_data_id, email);
    if (resultVerified !== null) {
        return resultVerified;
    }

    return checkPassword(password, user.password, user.user_data_id);
};

const userStatus = async (userDataId: string, email: string) => {
    //extract data from database
    const stateUser = await connectionPool.query(
        "SELECT state_id FROM user_data WHERE user_data_id = $1 LIMIT 1;",
        [userDataId]
    );
    //check if return some data to check if the state exist
    const result = dataIsEmpty(stateUser, "It doesn't exists that state of user");
    if (result !== null) {
        return result;
    }

    if (stateUser.rows[0].state_id !== 1) {
        let message = "";

        switch (stateUser.rows[0].state_id) {
            case 2: {
                const resultMail = await sendMail(email);
                if (resultMail !== null) {
                    return resultMail;
                }
                message =
                    "The user is not verified, a mail was send to your email account please go and verified it";
                break;
            }
            case 3:
                message = "The user was delete, please talk with the administrators";
                break;
            default:
                message =
                    "The user state is unknown, please talk with the administrators";
                break;
        }

        return {
            ok: false,
            code: 401,
            information: message,
        };
    }

    return null;
};

const sendMail = async (email: string) => {
    //extract data from database
    const userId = await connectionPool.query(
        `SELECT ud.user_data_id, u.first_name FROM public.user AS u 
    INNER JOIN user_data AS ud ON ud.user_id = u.user_id 
    WHERE u.email = $1 LIMIT 1;`,
        [email]
    );
    //check if return some data to check if the email exist
    if (!userId.rowCount) {
        return {
            ok: false,
            code: 401,
            information: "The user doesn't exist",
        };
    }
    //send the email confirmation to verify the account
    sendEmailConfirmation({
        to: email,
        name: userId.rows[0].first_name,
        id: userId.rows[0].user_data_id,
    });

    return null;
};

export async function POST(request: Request) {
    const data = await loginUser(request);
    try {
        return Response.json(
            {
                ok: data.ok,
                result: { data: data.information },
                code: data.code,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
