import { getBills, getBillsGRaphics } from "@/app/api/bills/add/route";
import BillsBody from "./bills-body";

const BillsRoot = async () => {
    const data = await getBills();
    const graphics = await getBillsGRaphics();

    return (
        <BillsBody data={data} graphics={graphics} />
    );
};

export default BillsRoot;
