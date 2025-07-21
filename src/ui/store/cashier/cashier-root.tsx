import CashierBody from "./cashier-body";

const CashierRoot = () => {

    const data = [
        {
            id: 1,
            product: "Pintura",
            amount: 3,
            price: "14.95$",
        },
        {
            id: 2,
            product: "Brocha",
            amount: 3,
            price: "14.95$",
        },
        {
            id: 3,
            product: "Pintura",
            amount: 3,
            price: "14.95$",
        }
    ]

    const exchanges = [
        {
            name: "DOL",
            conversion: "3"
        },
        {
            name: "COP",
            conversion: "3"
        },
        {
            name: "BOD",
            conversion: "3"
        },
        {
            name: "EUR",
            conversion: "3"
        }
    ]


    return (
        <CashierBody data={data} exchanges={exchanges} />
    );
};

export default CashierRoot;
