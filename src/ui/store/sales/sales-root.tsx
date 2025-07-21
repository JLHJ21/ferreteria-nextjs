import SalesBody from "./sales-body";

const SalesRoot = () => {

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

    return (
        <SalesBody data={data} />
    );
};

export default SalesRoot;
