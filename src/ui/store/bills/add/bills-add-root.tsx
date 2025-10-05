import { getCurriencies } from "@/app/api/currencies/add/route";
import BillsAddBody from "./bills-add-body";
import { displayCurrenciesSelect } from "@/app/api/bills/add/route";

const BillsAddRoot = async () => {
    const data = await displayCurrenciesSelect();


    return (
        <BillsAddBody data={data} />
    );
};

export default BillsAddRoot;
