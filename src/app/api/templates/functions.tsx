import type { QueryResult } from "pg";

export const dataIsEmpty = (data: QueryResult<any>, message: string) => {
  //check if return some data to check if the user exist
  if (!data.rowCount) {
    return {
      ok: false,
      code: 401,
      information: message,
    };
  }
  return null;
};

export const wasDataSaved = (data: QueryResult<any>, message: string) => {
  //check if return some data to check if the user exist
  if (!data.rowCount || data.rowCount <= 0) {
    return {
      ok:false,
      code: 401,
      information: message,
    };
  }
  return null;
};

export const haveData = (data: QueryResult<any>, message: string) => {
  //check if return some data to check if the user exist
  if (data.rowCount) {
    return {
      ok:false,
      code: 401,
      information: message,
    };
  }
  return null;
};


export const addHours = (date: Date, hours: number) => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);

  console.log(date);
  return date;
};
