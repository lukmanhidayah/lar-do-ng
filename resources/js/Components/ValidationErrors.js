import React from "react";

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4 bg-red-100 py-2 rounded ">
                <div className="font-medium border-b border-red-200 px-2 font-bold text-red-600">
                    Error
                </div>
                <ul className="list-disc list-inside p-2 pb-0 text-sm text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return <li key={index}>{errors[key]}</li>;
                    })}
                </ul>
            </div>
        )
    );
}
