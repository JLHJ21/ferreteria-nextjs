import { sendEmailConfirmation } from "./templates";

export const sendConfirmationEmailAndInsertIntoDatabase = async (
  id: string,
  email: string,
  name: string
) => {
  //send the confirmation code to verify the account
  sendEmailConfirmation({
    to: email,
    name: name,
    id: id,
  });
};
