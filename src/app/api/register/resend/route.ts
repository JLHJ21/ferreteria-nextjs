import connectionPool from "../../../../../db";
import { sendEmailConfirmation } from "../../templates/templates";

const resendMail = async (request: Request) => {
  //check if the required inputs are send, it is a validation input
  const { first, email } = await request.json();
  if (!first || !email) {
    return {
      ok: false,
      code: 400,
      information: "Some data required doesn't exist",
    };
  }

  //extract data from database
  const userId = await connectionPool.query(
    `SELECT ud.user_data_id FROM public.user AS u 
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
    name: first,
    id: userId.rows[0].user_data_id,
  });

  return {
    ok: true,
    code: 201,
    information: "All correct",
  };
};

export async function POST(request: Request) {
  try {
    const data = await resendMail(request);
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
