import SuppliersBody from "./suppliers-body";

const SuppliersRoot = () => {
    const data = [
        {
            id: 1,
            direction: "Tachira, San Cristobal",
            name: "30",
            rif: "USD",
            status: "Activo"
        },
        {
            id: 2,
            direction: "Tachira, San Cristobal",
            name: "10,000",
            rif: "COP",
            status: "Activo"
        },
        {
            id: 3,
            direction: "Tachira, Rubio",
            name: "10",
            rif: "USD",
            status: "Activo"
        }
    ]

    return (
        <SuppliersBody data={data} />
    );
};

export default SuppliersRoot;
