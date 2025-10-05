import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";

const createNewLoan = async (request: Request) => {
    const { client, money, currency } = await request.json();

    //check if the required inputs are send, it is a validation input
    if (!client || !money || !currency) {
        return {
            code: 400,
            information: "Some data required doesn't exists",
        };
    }

    const billInsert = await connectionPool.query(`
    INSERT INTO loans (loan_money, loan_paid, loan_date) 
    VALUES (TO_NUMBER($1, '999G999D00'),0, NOW())
    RETURNING loan_id;`,
        [money]
    );

    //check if return some data to check if the user exist
    const resulktBillInsert = wasDataSaved(
        billInsert,
        "Hubo un error al crear el prestamo"
    );
    if (resulktBillInsert !== null) {
        return resulktBillInsert;
    }

    const billDataInsert = await connectionPool.query(`
    INSERT INTO loans_data (loan_id, exchange_data_id, client_data_id, state_id) 
    VALUES ($1,$2,$3,$4);`,
        [billInsert.rows[0].loan_id, currency, client, 1]
    );
    //check if return some data to check if the user exist
    const resultBillDataInsert = wasDataSaved(
        billDataInsert,
        "Hubo un error al crear los datos del prestamo"
    );
    if (resultBillDataInsert !== null) {
        return resultBillDataInsert;
    }

    //if the password are not the same
    return {
        code: 201,
        information: "Se ha creado el prestamo con éxito",
    };
};

export const getLoans = async () => {
    //extract data from database
    const dataBills = await connectionPool.query(
        `SELECT 
        ld.loan_data_id as id,
        c.client_name as client,
        l.loan_money as money,
        l.loan_paid as paid,  
        e.exchange_name as currency,
        TO_CHAR(l.loan_date, 'DD-MM-YYYY') as date,
        s.state_name as status
        FROM loans_data as ld
        INNER JOIN loans as l ON l.loan_id = ld.loan_id
        LEFT JOIN states as s ON s.state_id = ld.state_id
        LEFT JOIN exchanges_data as ed ON ed.exchange_data_id = ld.exchange_data_id
        LEFT JOIN exchanges as e ON e.exchange_id = ed.exchange_id
        LEFT JOIN clients_data as cl ON cl.client_data_id = ld.client_data_id
        LEFT JOIN clients as c ON c.client_id = cl.client_id
        `,
    );

    //check if return some data to check if the user exist
    const result = haveData(
        dataBills,
        ""
    );
    if (result !== null) {
        return dataBills.rows;
    }

    return dataBills.rows;
}

export async function POST(request: Request) {
    const data = await createNewLoan(request);
    try {
        return Response.json(
            {
                result: data.information,
                code: data.code,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
