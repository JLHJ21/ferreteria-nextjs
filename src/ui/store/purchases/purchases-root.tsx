import PurchasesBody from "./purchases-body";

const PurchasesRoot = () => {
    const data = [
        {
            id: 1,
            supplier: "PlastiHogar",
            amount: 30,
            money: "100",
            date: "01-02-2025"
        },
        {
            id: 2,
            supplier: "PlastiHogar",
            amount: 10,
            money: "3,000",
            date: "01-02-2025"
        },
        {
            id: 3,
            supplier: "PlastiHogar",
            amount: 3,
            money: "100",
            date: "01-02-2025"
        }
    ]

    return (
        <PurchasesBody data={data} />
    );
};

export default PurchasesRoot;
