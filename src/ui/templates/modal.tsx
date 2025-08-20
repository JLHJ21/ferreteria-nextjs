import type React from "react";

type modalProps = {
    open: boolean;
    onClose: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
    children: React.ReactNode;
};

const Modal = (props: modalProps) => {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors z-20 ${props.open ? "visible bg-black/35" : "invisible"
                }`}
            onClick={props.onClose}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    props.onClose(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
            }}
        >
            {/*MODAL*/}
            <div
                className={`bg-white rounded-[0.25rem] transition-all w-[27.5rem]
                ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        props.onClose(e as unknown as React.MouseEvent<HTMLDivElement>);
                    }
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
