import ChevronLeftIcon from "@/Icon/ChevronLeftIcon";
import ChevronRightIcon from "@/Icon/ChevronRightIcon";
import React, { useRef } from "react";
import indonesia from "date-fns/locale/id";
import DatePicker from "react-datepicker";

const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

export default function CustomDatePicker({
    name,
    disable = false,
    id,
    value,
    isNull = false,
    required,
    handleChange,
}) {
    const inputEl = useRef(null);
    const years = getYears();

    return (
        <div className="relative w-full mb-6">
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
                <DatePicker
                    ref={inputEl}
                    placeholderText="dd/mm/yyyy"
                    maxDate={new Date()}
                    onChange={(date) =>
                        handleChange({
                            target: {
                                name: id,
                                value: date,
                                type: "date",
                            },
                        })
                    }
                    locale={indonesia}
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => {
                        return (
                            <div className="flex items-center justify-between w-full px-2">
                                <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                >
                                    <ChevronLeftIcon className="text-primary-800" />
                                </button>
                                <select
                                    className="px-3 py-1 border bg-white font-semibold rounded"
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option.substring(0, 3)}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="px-3 py-1 border bg-white font-semibold rounded"
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) =>
                                        changeYear(value)
                                    }
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                

                                <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                >
                                    <ChevronRightIcon className="text-primary-800" />
                                </button>
                            </div>
                        );
                    }}
                    selected={value}
                    dateFormat="dd/MM/yyyy"
                    required={required}
                    name={id}
                    className={`p-3 placeholder-gray-500 border-none text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 w-full ${
                        disable ? "bg-gray-100" : "bg-white"
                    }`}
                />
            </div>
        </div>
    );
}

const getYears = (startYear = 1990) => {
    let currentYear = new Date().getFullYear(),
        years = [];
    while (startYear <= currentYear) {
        years.push(startYear++);
    }
    return years;
};

const getYear = (date) => {
    const year = new Date(date);
    return year.getFullYear();
};

const getMonth = (date) => {
    const month = new Date(date);
    return month.getMonth();
};
