import ClientsBody from "./clients-body";

const ClientsRoot = () => {

    const data = [
        {
            id: 1,
            name: "Pintura",
            personalId: "V-12345",
        },
        {
            id: 2,
            name: "Brocha",
            personalId: "V-12345",
        },
        {
            id: 3,
            name: "Pintura",
            personalId: "V-12345",
        }
    ]

    return (
        <ClientsBody data={data} />
    );
};

export default ClientsRoot;
