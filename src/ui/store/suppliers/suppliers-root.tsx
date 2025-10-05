import { getSuppliers } from "@/app/api/suppliers/add/route";
import SuppliersBody from "./suppliers-body";

const SuppliersRoot = async () => {
    const data = await getSuppliers();

    return (
        <SuppliersBody data={data} />
    );
};

export default SuppliersRoot;
