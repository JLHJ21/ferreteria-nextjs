import BillsBody from "./bills-body";

const BillsRoot = () => {
    const data = [
        {
            id: 1,
            reason: "Pago de Luz",
            money: "30",
            currency: "USD"
        },
        {
            id: 2,
            reason: "Pago de Luz",
            money: "10,000",
            currency: "COP"
        },
        {
            id: 3,
            reason: "Pago de Gas",
            money: "10",
            currency: "USD"
        }
    ]

    return (
        <BillsBody data={data} />
    );
};

export default BillsRoot;
