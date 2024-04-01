import AktivitasIcon from "@/Icon/AktivitasIcon";
import React, { useEffect, useState } from "react";
import CustomLink from "./CustomLink";

const ExpandableLink = ({
    link,
    currentPage,
    children,
    className,
    expandableItem,
}) => {
    const [isExpand, setIsExpand] = useState(false);
    useEffect(() => {
        if (currentPage == link) {
            setIsExpand(true);
        }
    }, []);

    const toggleExpand = () => setIsExpand((prevState) => !prevState);

    return (
        <>
            <div
                onClick={toggleExpand}
                title={link}
                className={`expandable-container ${
                    isExpand && "active"
                } cursor-pointer select-none ${className}`}
            >
                {children}
            </div>
            {isExpand && expandableItem}
        </>
    );
};

export default ExpandableLink;
