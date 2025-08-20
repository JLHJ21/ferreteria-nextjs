import LoansBody from "./loans-body";

const LoansRoot = () => {
    const data = [
        {
            id: 1,
            giveTo: "George",
            money: "300",
            currency: "USD",
            paid: "100",
            date: "10-10-2025",
            state: "Activo"
        },
        {
            id: 2,
            giveTo: "George",
            money: "10,000",
            currency: "COP",
            paid: "5,000",
            date: "10-10-2025",
            state: "Activo"
        },
        {
            id: 3,
            giveTo: "George",
            money: "100",
            currency: "USD",
            paid: "100",
            date: "10-10-2025",
            state: "Pagado"
        }
    ]

    return (
        <LoansBody data={data} />
    );
};

export default LoansRoot;
