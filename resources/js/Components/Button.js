import React from "react";
import Spinner from "./Spinner";

export default function Button({
    type = "submit",
    processing,
    disable,
    title,
    className,
    onClick,
    style,
    typeSpinner = "white-spinner",
}) {
    return (
        <button
            style={style}
            disabled={processing || disable}
            className={`relative flex items-center justify-center 
                text-base tracking-widest
                font-bold uppercase px-6 rounded shadow
                ease-linear transition-all duration-150 normal-case outline-none
                hover:shadow-lg focus:outline-none my-3  ${
                    processing || (disable && "opacity-75")
                } ${className}`}
            type={type}
            onClick={onClick}
        >
            {processing ? (
                <Spinner type={typeSpinner} width={18} height={18} />
            ) : (
                title
            )}
        </button>
    );
}
