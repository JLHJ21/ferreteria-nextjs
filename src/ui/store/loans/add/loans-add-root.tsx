import { displayCurrenciesSelect } from "@/app/api/bills/add/route";
import LoansAddBody from "./loans-add-body";
import { getClients } from "@/app/api/clients/add/route";

const LoansAddRoot = async () => {
    const data = await displayCurrenciesSelect();
    const clients = await getClients();

    let clientsFormated: { title: string, value: string }[] = []
    clients.map((client) => {
        return (
            clientsFormated.push({ title: client.name, value: client.id })
        )
    })

    return (
        <LoansAddBody data={data} clients={clientsFormated} />
    );
};

export default LoansAddRoot;
