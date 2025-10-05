import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";


const checkIfClientExist = async (client: string, id: string) => {
    //extract data from database
    const supplerData = await connectionPool.query(
        "SELECT client_id FROM clients WHERE client_name = $1 OR client_document= $2  LIMIT 1",
        [client, id]
    );

    //check if return some data to check if the user exist
    const result = haveData(
        supplerData,
        "Nombre o id ya existen, elige otro."
    );
    if (result !== null) {
        return result;
    }

    return null;
}

const createNewClient = async (request: Request) => {
    const { client, id } = await request.json();

    //check if the required inputs are send, it is a validation input
    if (!client || !id) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exists",
        };
    }

    const check = await checkIfClientExist(client, id);
    if (check !== null) {
        return check;
    }

    const clientInsert = await connectionPool.query(`
    INSERT INTO clients (client_name, client_document) 
    VALUES ($1,$2)
    RETURNING client_id;`,
        [client, id]
    );

    //check if return some data to check if the user exist
    const resultClientInsert = wasDataSaved(
        clientInsert,
        "Hubo un error al crear el cliente"
    );
    if (resultClientInsert !== null) {
        return resultClientInsert;
    }

    const clientDataInsert = await connectionPool.query(`
    INSERT INTO clients_data (client_id, state_id) 
    VALUES ($1,$2);`,
        [clientInsert.rows[0].client_id, 1]
    );
    //check if return some data to check if the user exist
    const resultClientDataInsert = wasDataSaved(
        clientDataInsert,
        "Hubo un error al crear los datos de la divisa"
    );
    if (resultClientDataInsert !== null) {
        return resultClientDataInsert;
    }

    //if the password are not the same
    return {
        code: 201,
        ok: true,
        information: "Se ha creado el cliente con éxito",
    };
};

export const getClients = async () => {
    //extract data from database
    const dataUser = await connectionPool.query(
        `SELECT cd.client_data_id as id, c.client_name as name, c.client_document as document, st.state_name as status
        FROM clients_data as cd
        INNER JOIN clients AS c ON cd.client_id = c.client_id
        LEFT JOIN states as st ON cd.state_id = st.state_id
        WHERE cd.state_id = 1`,
    );

    //check if return some data to check if the user exist
    const result = haveData(
        dataUser,
        ""
    );
    if (result !== null) {
        return dataUser.rows;
    }

    return dataUser.rows;
}

export async function POST(request: Request) {
    const data = await createNewClient(request);
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
