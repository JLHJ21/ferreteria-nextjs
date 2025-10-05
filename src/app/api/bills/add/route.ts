import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";

export const displayCurrenciesSelect = async () => {
    //extract data from database
    const dataCurrencies = await connectionPool.query(
        `SELECT e.exchange_name as title, ed.exchange_data_id as value FROM exchanges as e
        INNER JOIN exchanges_data as ed ON ed.exchange_id = e.exchange_id
        LEFT JOIN states as states ON states.state_id = ed.state_id
        WHERE ed.state_id = 1`,
    );

    return dataCurrencies.rows
}

const createNewBill = async (request: Request) => {
    const { reason, money, id } = await request.json();

    //check if the required inputs are send, it is a validation input
    if (!reason || !money || !id) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exists",
        };
    }

    const billInsert = await connectionPool.query(`
    INSERT INTO bills (bill_reason, bill_money, bill_date) 
    VALUES ($1,TO_NUMBER($2, '999G999D00'), NOW())
    RETURNING bill_id;`,
        [reason, money]
    );

    //check if return some data to check if the user exist
    const resulktBillInsert = wasDataSaved(
        billInsert,
        "Hubo un error al crear el gasto"
    );
    if (resulktBillInsert !== null) {
        return resulktBillInsert;
    }

    const billDataInsert = await connectionPool.query(`
    INSERT INTO bills_data (bill_id, bill_exchange, state_id) 
    VALUES ($1,$2,$3);`,
        [billInsert.rows[0].bill_id, id, 1]
    );
    //check if return some data to check if the user exist
    const resultBillDataInsert = wasDataSaved(
        billDataInsert,
        "Hubo un error al crear los datos de la divisa"
    );
    if (resultBillDataInsert !== null) {
        return resultBillDataInsert;
    }

    //if the password are not the same
    return {
        code: 201,
        ok: true,
        information: "Se ha creado el gasto con éxito",
    };
};

export const getBills = async () => {
    //extract data from database
    const dataBills = await connectionPool.query(
        `SELECT 
            bd.bill_data_id as id, 
            b.bill_reason as reason, 
            TO_CHAR(b.bill_money, 'FM999G999D00') as money, 
            TO_CHAR(b.bill_date, 'DD-MM-YYYY') as date,
            e.exchange_name as currency,
            st.state_name as status
        FROM bills_data as bd
        INNER JOIN bills AS b ON bd.bill_id = b.bill_id
        LEFT JOIN states as st ON bd.state_id = st.state_id
        LEFT JOIN exchanges_data as ed ON ed.exchange_data_id = bd.bill_exchange
        LEFT JOIN exchanges as e ON e.exchange_id = ed.exchange_id
        WHERE bd.state_id = 1`,
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

export const getBillsGRaphics = async () => {
    //extract data from database
    const dataBills = await connectionPool.query(
        `
    WITH meses AS (
    SELECT 
        generate_series(1, 12) AS mes_num,
        TO_CHAR(to_date(generate_series(1, 12)::text, 'MM'), 'TMMonth') AS month_string
    )
    SELECT 
        m.month_string AS month,
        TO_CHAR(COALESCE(SUM(b.bill_money), 0), 'FM999G999G999G990D00') AS money
    FROM meses m
    LEFT JOIN bills b 
        ON EXTRACT(MONTH FROM b.bill_date) = m.mes_num
    LEFT JOIN bills_data bd 
        ON b.bill_id = bd.bill_id
    LEFT JOIN exchanges_data ed 
        ON bd.bill_exchange = ed.exchange_data_id
    LEFT JOIN exchanges e 
        ON ed.exchange_id = e.exchange_id
    GROUP BY m.mes_num, m.month_string
    ORDER BY m.mes_num;

`
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
    const data = await createNewBill(request);
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
