import connectionPool from "../../../../../db";
import { dataIsEmpty } from "../../templates/functions";

const confirmEmail = async (request: Request) => {
  const { code, email } = await request.json();
  const today = new Date().toISOString();

  //check if the required inputs are send, it is a validation input
  if (!code || !email) {
    return {
      ok: false,
      code: 400,
      information: "Some data required doesn't exists",
    };
  }

  //extract data from database
  const dataUser = await connectionPool.query(
    "SELECT user_id FROM public.user WHERE email = $1 LIMIT 1;",
    [email]
  );
  //check if return some data to check if the user exist
  const result = dataIsEmpty(dataUser, "The email doesn't exist");
  if (result !== null) {
    return result;
  }

  const userId = dataUser.rows[0].user_id;
  const userDataId = await getUserData(userId);

  if (typeof userDataId !== "string") {
    return userDataId;
  }

  //extract data from database
  const codeUser = await connectionPool.query(
    "SELECT code_id, code, expiry FROM confirmation_code WHERE user_data_id = $1 LIMIT 1;",
    [userDataId]
  );
  //check if return some data to check if the user exist
  const resultCode = dataIsEmpty(codeUser, "The code doesn't exist");
  if (resultCode !== null) {
    return resultCode;
  }

  if (today > codeUser.rows[0].expiry) {
    return {
      ok: false,
      code: 401,
      information: { pass: true, message: "The code is expired" },
    };
  }
  if (codeUser.rows[0].code !== code) {
    return {
      ok: true,
      code: 401,
      information: { pass: false, message: "The code is incorrect" },
    };
  }

  await connectionPool.query(
    "DELETE FROM confirmation_code WHERE code_id = $1;",
    [codeUser.rows[0].code_id]
  );

  return {
    ok: true,
    code: 201,
    information: { pass: true, message: "The code is correct" },
  };
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
