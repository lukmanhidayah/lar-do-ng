import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const RootModal = ({ children }) => {
    const modalRoot = document.querySelector("#modal-root");
    const body = document.getElementsByTagName("body")[0];

    useEffect(() => {
        modalRoot?.classList.add("modal-open");
        body?.classList.add("modal-open");

        return () => {
            void modalRoot?.classList.remove("modal-open");
            void body?.classList.remove("modal-open");
        };
    }, [modalRoot]);

    return createPortal(children, modalRoot);
};

export default RootModal;
