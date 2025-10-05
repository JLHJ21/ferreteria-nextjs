import { showCurriencies } from "@/app/api/currencies/add/route";
import CurrenciesBody from "./currencies-body";

const CurrenciesRoot = async () => {

    const data = await showCurriencies();
    return (
        <CurrenciesBody data={data} />
    );
};

export default CurrenciesRoot;
