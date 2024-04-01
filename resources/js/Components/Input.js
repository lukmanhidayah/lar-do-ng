import React, { useState, useRef } from "react";
import EyeIcon from "@/Icon/EyeIcon";
import EyeOffIcon from "@/Icon/EyeOff";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";

const numericRegex = /^[0-9]+$/;

export default function Input({
    type = "text",
    name,
    disable = false,
    id,
    value,
    required = false,
    handleChange,
    onKeyPress,
    isNull = false,
    inputMode = "text",
    placeholder,
    maxLength,
    disabledColor = "bg-gray-100",
    note,
    mt = "6",
}) {
    const inputEl = useRef(null);

    const [showPassword, setShowPassword] = useState(false);

    const onClickEye = () => {
        setShowPassword((prevState) => !prevState);
        inputEl.current.focus();
    };

    const inputKyePress = (e) => e;

    const onChange = (e) => {
        if (e.target.value.length > 0) {
            if (inputMode == "numeric") {
                if (numericRegex.test(e.target.value)) {
                    handleChange(e);
                }
            } else {
                handleChange(e);
            }
        } else {
            handleChange(e);
        }
    };

    return (
        <div className={`relative w-full mb-${mt}`}>
            <div className="flex justify-between">
                <label
                    className="block text-gray-900 cursor-pointer text-base font-semibold mb-2"
                    htmlFor={id}
                >
                    {name}
                </label>
                {required == false && (
                    <span className="text-gray-500 text-sm">(Opsional)</span>
                )}
            </div>
            <div
                className={`relative flex items-center border rounded ${
                    isNull ? "border-red-500" : "border-gray-300"
                }`}
            >
                <input
                    type={!showPassword ? type : "text"}
                    ref={inputEl}
                    value={value}
                    disabled={disable}
                    onKeyPress={
                        onKeyPress
                            ? (e) => onKeyPress(e)
                            : (e) => inputKyePress(e)
                    }
                    id={id}
                    maxLength={maxLength}
                    name={id}
                    required={required}
                    onChange={onChange}
                    autoComplete={name}
                    className={`p-3 placeholder-gray-500 border-none text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 w-full ${
                        disable ? disabledColor : "bg-white"
                    }`}
                    placeholder={
                        isNullOrEmpty(placeholder) ? `${name}...` : placeholder
                    }
                />
                {(name?.toLowerCase() == "password" ||
                    name?.toLowerCase() == "confirm password" ||
                    name?.toLowerCase() == "current password" ||
                    name?.toLowerCase() == "new password") && (
                    <div
                        id={`button-${id}`}
                        type="button"
                        onClick={onClickEye}
                        className="absolute flex justify-center items-center h-full w-12 right-0 bg-white rounded-r focus:outline-none cursor-pointer"
                    >
                        {!showPassword ? (
                            <EyeIcon className="stroke-current text-gray-500 w-6" />
                        ) : (
                            <EyeOffIcon className="stroke-current text-gray-500 w-6" />
                        )}
                    </div>
                )}
            </div>
            <div className="w-full">{note}</div>
        </div>
    );
}
