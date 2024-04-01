import * as React from "react";

function InputIcon(props) {
    return (
        <svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.5 9.83a1.866 1.866 0 01-1.865 1.865h-1.27A1.866 1.866 0 015.5 9.83h-5v5.313c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9.829h-5zM7.974 8.89l2.377-2.33c.234-.228.158-.414-.17-.414H8.755V1.389a.781.781 0 10-1.563 0v4.757H5.766c-.328 0-.404.186-.17.415l2.378 2.328z"
                fill="currentColor"
            />
        </svg>
    );
}

export default InputIcon;
