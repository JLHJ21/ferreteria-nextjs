import CurrenciesBody from "./currencies-body";

const CurrenciesRoot = () => {
    const data = [
        {
            id: 1,
            reason: "Pago de Luz",
            money: "30",
            currency: "USD",
            date: "10-12-2025"
        },
        {
            id: 2,
            reason: "Pago de Luz",
            money: "10,000",
            currency: "COP",
            date: "10-12-2025"
        },
        {
            id: 3,
            reason: "Pago de Gas",
            money: "10",
            currency: "USD",
            date: "10-12-2025"
        }
    ]

    return (
        <CurrenciesBody data={data} />
    );
};

export default CurrenciesRoot;
