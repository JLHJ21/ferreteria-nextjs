import connectionPool from "../../../../../db";
import bcryptjs from "bcryptjs";

const changePassword = async (request: Request) => {
  const { password, repeat, email } = await request.json();
  //check if the required inputs are send, it is a validation input
  if (!password || !repeat || !email) {
    return {
      ok: false,
      code: 400,
      information: "Some data required doesn't exists",
    };
  }

  if (password !== repeat) {
    return {
      ok: false,
      code: 401,
      information: { name: "", email: "The passwords are not the same" },
    };
  }

  const newPassword = await bcryptjs.hash(password, 10);
  //extract data from database
  await connectionPool.query(
    "UPDATE public.user SET password = $1 WHERE email = $2;",
    [newPassword, email]
  );

  return {
    ok: true,
    code: 201,
    information: { pass: true, message: "The code is correct" },
  };
};

export async function POST(request: Request) {
  const data = await changePassword(request);
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
