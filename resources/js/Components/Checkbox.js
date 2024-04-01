import React from "react";

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            checked={value}
            className="form-checkbox rounded
            border-gray-300 text-primary-600 ring-1 ring-gray-100
            focus:outline-none focus:ring-2 focus:ring-primary-600 transition
            duration-500 ease-in-out cursor-pointer"
            onChange={(e) => handleChange(e)}
        />
    );
}
