import { getClients } from "@/app/api/clients/add/route";
import ClientsBody from "./clients-body";

const ClientsRoot = async () => {

    const data = await getClients();

    return (
        <ClientsBody data={data} />
    );
};

export default ClientsRoot;
