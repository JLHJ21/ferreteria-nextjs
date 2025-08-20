import connectionPool from "../../../../../db";
import { sendConfirmationCode } from "../../templates/templates";
import { addHours, dataIsEmpty } from "../../templates/functions";

async function confirmEmail(request: Request) {
  const { email } = await request.json();

  //check if the required inputs are send, it is a validation input
  if (!email) {
    return {
      ok: false,
      code: 400,
      information: "Some data required doesn't exists",
    };
  }

  //extract data from database
  const dataUser = await connectionPool.query(
    "SELECT user_id, first_name FROM public.user WHERE email = $1 LIMIT 1;",
    [email]
  );
  //check if return some data to check if the user exist
  const result = dataIsEmpty(dataUser, "The email doesn't exist");
  if (result !== null) {
    return result;
  }

  const userId = dataUser.rows[0].user_id;
  const name = dataUser.rows[0].first_name;
  const userDataId = await getUserData(userId);

  if (typeof userDataId !== "string") {
    return userDataId;
  }

  sendCode(userDataId, email, name);

  return {
    ok: true,
    code: 201,
    information: "All correct",
  };
}

const sendCode = async (id: string, email: string, name: string) => {
  let codeSend = 0;
  const expired = new Date();
  const newExpired = addHours(expired, 0.5);

  const codes = await connectionPool.query(
    `
    SELECT code FROM confirmation_code WHERE user_data_id = $1 LIMIT 1;`,
    [id]
  );

  if (!codes.rowCount) {
    codeSend = Math.floor(1000 + Math.random() * 9000);
    await connectionPool.query(
      `
        INSERT INTO confirmation_code (code, user_data_id, expiry) 
        VALUES ($1, $2, $3);`,
      [codeSend, id, newExpired.toISOString()]
    );
  } else {
    codeSend = codes.rows[0].code;
  }

  //send the confirmation code to verify the account
  sendConfirmationCode({
    to: email,
    name: name,
    code: codeSend,
  });
};

const getUserData = async (userId: string) => {
  //extract data from database
  const dataUserData = await connectionPool.query(
    "SELECT user_data_id FROM user_data WHERE user_id = $1 LIMIT 1;",
    [userId]
  );

  //check if return some data to check if the user exist
  const resultUserData = dataIsEmpty(
    dataUserData,
    "The user doesn't exist, talk witht the administrators"
  );
  if (resultUserData !== null) {
    return resultUserData;
  }

  return dataUserData.rows[0].user_data_id;
};

export async function POST(request: Request) {
  const data = await confirmEmail(request);
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
