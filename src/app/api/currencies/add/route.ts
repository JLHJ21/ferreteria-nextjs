import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";

const createNewCurrency = async (request: Request) => {
    const { nameCurrency, acronymCurrency, currencies } = await request.json();

    //check if the required inputs are send, it is a validation input
    if (!nameCurrency || !acronymCurrency || !currencies) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exists",
        };
    }

    //extract data from database
    const dataUser = await connectionPool.query(
        "SELECT exchange_id FROM exchanges WHERE exchange_name = $1 OR exchange_acronym= $2 LIMIT 1",
        [nameCurrency, acronymCurrency]
    );

    //check if return some data to check if the user exist
    const result = haveData(
        dataUser,
        "Nombre o acronimo ya existen, elige otro."
    );
    if (result !== null) {
        return result;
    }

    const exchangesInsert = await connectionPool.query(`
    INSERT INTO exchanges (exchange_name, exchange_money, exchange_acronym) 
    VALUES ($1,$2,$3)
    RETURNING exchange_id;`,
        [nameCurrency, 0, acronymCurrency]
    );

    //check if return some data to check if the user exist
    const resultExchangesInsert = wasDataSaved(
        exchangesInsert,
        "Hubo un error al crear la divisa"
    );
    if (resultExchangesInsert !== null) {
        return resultExchangesInsert;
    }

    const exchangesDataInsert = await connectionPool.query(`
    INSERT INTO exchanges_data (exchange_id, state_id) 
    VALUES ($1,$2)
    RETURNING exchange_data_id;`,
        [exchangesInsert.rows[0].exchange_id, 1]
    );
    //check if return some data to check if the user exist
    const resultExchangesDataInsert = wasDataSaved(
        exchangesDataInsert,
        "Hubo un error al crear los datos de la divisa"
    );
    if (resultExchangesDataInsert !== null) {
        return resultExchangesDataInsert;
    }

    console.log(exchangesDataInsert.rows[0].exchange_data_id,)

    for (const currency of JSON.parse(currencies) as Array<{ id: number; conversion: number; type: string }>) {
        await connectionPool.query(`
            INSERT INTO exchanges_conversion (exchange_convert_id, exchange_to_convert_id, exchange_to_convert_number, exchange_operation) 
            VALUES ($1, $2, $3, $4);`,
            [exchangesDataInsert.rows[0].exchange_data_id, currency.id, currency.conversion, currency.type]
        );
    }

    //if the password are not the same
    return {
        code: 201,
        information: "Se ha creado la divisa con éxito",
    };
};

export const getCurriencies = async () => {
    //extract data from database
    const dataUser = await connectionPool.query(
        `SELECT CONCAT(e.exchange_acronym, '|', ed.exchange_data_id) as acronym FROM exchanges as e
        INNER JOIN exchanges_data as ed ON ed.exchange_id = e.exchange_id
        WHERE ed.state_id = 1`,
    );

    //check if return some data to check if the user exist
    const result = haveData(
        dataUser,
        ""
    );
    if (result !== null) {
        return dataUser.rows;
    }

    return [{ acronym: "no hay ninguno registrado" }];
}

export const showCurriencies = async () => {
    //extract data from database
    const dataCurrencies = await connectionPool.query(
        `SELECT e.exchange_name as name, e.exchange_money as money, states.state_name as state FROM exchanges as e
        INNER JOIN exchanges_data as ed ON ed.exchange_id = e.exchange_id
        LEFT JOIN states as states ON states.state_id = ed.state_id
        WHERE ed.state_id = 1`,
    );

    //extract data from database
    const dataConversion = await connectionPool.query(
        `
            SELECT
            e_from.exchange_name AS from_name,
            e_to.exchange_name   AS to_name,
            ec.exchange_to_convert_number as number,
            ec.exchange_operation as operation
            FROM exchanges_conversion ec
            LEFT JOIN exchanges_data ed_from
            ON ec.exchange_convert_id = ed_from.exchange_data_id
            LEFT JOIN exchanges e_from
            ON ed_from.exchange_id = e_from.exchange_id
            LEFT JOIN exchanges_data ed_to
            ON ec.exchange_to_convert_id = ed_to.exchange_data_id
            LEFT JOIN exchanges e_to
            ON ed_to.exchange_id = e_to.exchange_id
            WHERE ed_from.state_id = 1 AND ed_to.state_id = 1
            `
        ,
    );

    return [{ currencies: dataCurrencies.rows, conversion: dataConversion.rows }];
}

export async function POST(request: Request) {
    const data = await createNewCurrency(request);
    try {
        return Response.json(
            {
                result: { data: data.information },
                code: data.code,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
