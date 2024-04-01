import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import React from "react";
import Select from "react-select";
// borderColor: state.isFocused? '#12497C': 'rgb(204, 204, 204)',

const SelectOption = ({
    isDisabled = false,
    isLoading = false,
    className,
    required = false,
    name,
    id,
    handleChange,
    value,
    placeholder,
    isNull = false,
    options,
}) => {
    const customStyles = {
        input: () => ({
            padding: "0.5rem",
        }),
        control: (provider, state) => ({
            // ...provider,
            WebkitBoxAlign: "center",
            alignItems: "center",
            backgroundColor: isDisabled ? "rgb(243, 244, 246)" : "white",
            borderRadius: "4px",
            borderStyle: "solid",
            borderWidth: "1px",
            cursor: "default",
            display: "flex",
            flexWrap: "wrap",
            WebkitBoxPack: "justify",
            justifyContent: "space-between",
            minHeight: "38px",
            position: "relative",
            transition: "all 100ms ease 0s",
            boxSizing: "border-box",
            outline: "0px !important",
            borderColor: state.isFocused
                ? "#12497C"
                : isNull
                ? "rgb(239, 68, 68)"
                : "rgb(204, 204, 204)",
            boxShadow: state.isFocused ? "0 0 0 1px #12497C" : "unset",
        }),
    };
    return (
        <div className={`mb-6 ${className}`}>
            <div className="flex justify-between">
                {!isNullOrEmpty(name) && (
                    <>
                        <label
                            className="block text-gray-900 text-base font-semibold mb-2"
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
            <Select
                className={`${className}`}
                // defaultValue={colourOptions[0]}
                styles={customStyles}
                isDisabled={isDisabled}
                onChange={(e) =>
                    handleChange({
                        target: {
                            name: id,
                            value: e,
                            type: "select",
                        },
                    })
                }
                isLoading={isLoading}
                isClearable={false}
                isSearchable={true}
                value={value}
                name={id}
                id={id}
                placeholder={
                    isNullOrEmpty(placeholder) ? `${name}...` : placeholder
                }
                options={options}
            />
        </div>
    );
};

export default SelectOption;
