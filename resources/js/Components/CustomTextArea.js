import React, { useRef } from "react";

export default function CustomTextArea({
    name,
    disable = false,
    id,
    value,
    isNull = false,
    required = false,
    handleChange,
    disabledColor = "bg-gray-100",
    className,
    mb = "mb-6",
    hideLabel = false,
}) {
    const inputEl = useRef(null);

    return (
        <div className={`relative w-full ${mb}`}>
            <div className="flex justify-between">
                {hideLabel == false && (
                    <>
                        <label
                            className="block text-gray-900 cursor-pointer text-base font-semibold mb-2"
                            htmlFor={id}
                        >
                            {name}
                        </label>
                        {required == false && (
                            <span className="text-gray-500 text-sm">
                                (Opsional)
                            </span>
                        )}
                    </>
                )}
            </div>
            <div
                className={`relative flex items-center border rounded ${
                    isNull ? "border-red-500" : "border-gray-300"
                }`}
            >
                <textarea
                    ref={inputEl}
                    value={value}
                    disabled={disable}
                    id={id}
                    rows={4}
                    name={id}
                    required={required}
                    onChange={(e) => handleChange(e)}
                    autoComplete={name}
                    className={`p-3 resize-none overflow-hidden overflow-y-auto placeholder-gray-500 border-none text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 w-full ${
                        disable ? disabledColor : "bg-white"
                    } ${className}`}
                    placeholder={`${name}...`}
                />
            </div>
        </div>
    );
}
