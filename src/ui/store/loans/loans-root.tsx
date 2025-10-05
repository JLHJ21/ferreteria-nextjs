import { getLoans } from "@/app/api/loans/add/route";
import LoansBody from "./loans-body";

const LoansRoot = async () => {
    const data = await getLoans();


    return (
        <LoansBody data={data} />
    );
};

export default LoansRoot;
