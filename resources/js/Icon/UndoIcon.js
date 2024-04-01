import * as React from "react";

function UndoIcon(props) {
    return (
        <svg
            width={50}
            height={50}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M10.125 5.25a4.875 4.875 0 110 9.75H7.5v-1.5h2.625C12 13.5 13.5 12 13.5 10.125S12 6.75 10.125 6.75H5.872l2.31 2.318-1.057 1.057L3 6l4.125-4.125L8.19 2.933 5.873 5.25h4.252zM4.5 13.5H6V15H4.5v-1.5z"
                fill="#FFC300"
            />
            <path d="M4.5 13.5H6V15H4.5v-1.5z" fill="#14B8A6" />
        </svg>
    );
}

export default UndoIcon;
