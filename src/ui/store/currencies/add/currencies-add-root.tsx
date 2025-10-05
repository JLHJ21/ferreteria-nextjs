import { getCurriencies } from "@/app/api/currencies/add/route";
import CurrenciesAddBody from "./currencies-add-body";

const CurrenciesAddRoot = async () => {
    const othersCurrencies = await getCurriencies();
    return (
        <CurrenciesAddBody othersCurrencies={othersCurrencies} />
    );
};

export default CurrenciesAddRoot;
