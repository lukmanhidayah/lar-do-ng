import * as React from "react";
import "@/Assets/Css/my-spinner.css";

// type = white-spinner or primary-spinner

function Spinner({ type = "white-spinner", width, height, strokeWidth = 4 }) {
    let className = `${type}__value`;

    return (
        <svg
            className={type}
            strokeWidth={strokeWidth}
            viewBox="0 0 24 24"
            width={width}
            height={height}
        >
            <circle className={className} cx={12} cy={12} r={10} />
            <circle className={className} cx={12} cy={12} r={10} />
            <circle className={className} cx={12} cy={12} r={10} />
            <circle className={className} cx={12} cy={12} r={10} />
            <circle className={className} cx={12} cy={12} r={10} />
            <circle className={className} cx={12} cy={12} r={10} />
        </svg>
    );
}

export default Spinner;
