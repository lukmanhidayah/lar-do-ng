import { Link } from "@inertiajs/inertia-react";
import React from "react";

const CustomLink = ({ link, currentPage, children, className }) => {
    if (currentPage == link) {
        return (
            <a
                href={undefined}
                title={link}
                className={`active cursor-pointer select-none ${className}`}
            >
                {children}
            </a>
        );
    }
    return (
        <Link
            href={route(link)}
            title={link}
            className={`select-none ${className}`}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
