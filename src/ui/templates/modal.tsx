import type React from "react";
import Modal from "react-bootstrap/Modal";

type modalProps = {
    open: boolean;
    onClose: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
    children: React.ReactNode;
};

const ModalCustom = (props: modalProps) => {
    return (
        <Modal
            show={props.open}
            onHide={() => !props.open}
            centered
            contentClassName="bg-dark text-white"
        >
            <Modal.Header
                closeButton={false}
                className="px-4 border-0"
            />

            {props.children}
        </Modal>
    );
};

export default ModalCustom;
