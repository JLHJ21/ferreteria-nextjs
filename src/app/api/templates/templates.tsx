import { compileCodeTemplate, compileConfirmationTemplate, sendMail } from "@/components/mail/mail";

type propsEmail = {
  to: string;
  name: string;
  id: string;
};

type propsCode = {
  to: string;
  name: string;
  code: number;
};

export const sendEmailConfirmation = async (props: propsEmail) => {
  "use server";
  const link = `http://localhost:3000/api/register?identification=${props.id}&&email=${props.to}`;
  await sendMail({
    to: props.to,
    name: props.name,
    subject: "Confirmation mail",
    body: compileConfirmationTemplate(props.name, link, props.to),
  });
};

export const sendConfirmationCode = async (props: propsCode) => {
  "use server";
  await sendMail({
    to: props.to,
    name: props.name,
    subject: "Code confirmation mail",
    body: compileCodeTemplate(props.name, props.code, props.to),
  });
};
