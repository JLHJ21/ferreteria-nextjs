import { useEffect, useState } from "react";

type PaidByClientProps = {
    paidMoney: { id: number; money: string; currency: string }[]
}

const PaidByClient = (props: PaidByClientProps) => {

    const [money, setMoney] = useState(0);

    const allPaidMoney = () => {
        let moneyChange = 0;
        props.paidMoney.forEach(paid => {
            const transformedValue = paid.money.replace(/,/g, '.');
            moneyChange = parseFloat(transformedValue) + moneyChange
        });

        if (isNaN(moneyChange)) {
            moneyChange = 0;
        }

        return moneyChange
    }

    useEffect(() => {
        setMoney(allPaidMoney())
    }, [props.paidMoney])

    return (
        <div className="d-flex justify-content-between mt-auto">
            <p className="fw-bold fs-6 mb-0">
                Pagado:
            </p>
            <p className="mb-0">{money}$</p>
        </div>
    )
}

export default PaidByClient;