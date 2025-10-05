import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";


const checkIfSupplierExist = async (supplier: string, rif: string) => {
    //extract data from database
    const supplerData = await connectionPool.query(
        "SELECT supplier_id FROM suppliers WHERE supplier_name = $1 OR supplier_rif= $2  LIMIT 1",
        [supplier, rif]
    );

    //check if return some data to check if the user exist
    const result = haveData(
        supplerData,
        "Nombre o rif ya existen, elige otro."
    );
    if (result !== null) {
        return result;
    }

    return null;
}

const createNewSupplier = async (request: Request) => {
    const { supplier, rif, address } = await request.json();

    //check if the required inputs are send, it is a validation input
    if (!supplier || !rif || !address) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exists",
        };
    }

    const check = await checkIfSupplierExist(supplier, rif);
    if (check !== null) {
        return check;
    }

    const supplierInsert = await connectionPool.query(`
    INSERT INTO suppliers (supplier_name, supplier_rif, supplier_address) 
    VALUES ($1,$2,$3)
    RETURNING supplier_id;`,
        [supplier, rif, address]
    );

    //check if return some data to check if the user exist
    const resultExchangesInsert = wasDataSaved(
        supplierInsert,
        "Hubo un error al crear la divisa"
    );
    if (resultExchangesInsert !== null) {
        return resultExchangesInsert;
    }

    const exchangesDataInsert = await connectionPool.query(`
    INSERT INTO suppliers_data (supplier_id, state_id) 
    VALUES ($1,$2);`,
        [supplierInsert.rows[0].supplier_id, 1]
    );
    //check if return some data to check if the user exist
    const resultExchangesDataInsert = wasDataSaved(
        exchangesDataInsert,
        "Hubo un error al crear los datos de la divisa"
    );
    if (resultExchangesDataInsert !== null) {
        return resultExchangesDataInsert;
    }

    //if the password are not the same
    return {
        code: 201,
        ok: true,
        information: "Se ha creado el proveedor con éxito",
    };
};

export const getSuppliers = async () => {
    //extract data from database
    const dataUser = await connectionPool.query(
        `SELECT sd.supplier_data_id as id, s.supplier_name as name, s.supplier_rif as rif, s.supplier_address as address, st.state_name as status
        FROM suppliers_data as sd
        INNER JOIN suppliers AS s ON sd.supplier_id = s.supplier_id
        LEFT JOIN states as st ON sd.state_id = st.state_id
        WHERE sd.state_id = 1`,
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
    const data = await createNewSupplier(request);
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
