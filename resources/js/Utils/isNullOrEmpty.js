const isNullOrEmpty = (val) => {
    return (
        val === "" ||
        val === undefined ||
        val === "undefined" ||
        val === " " ||
        val === null ||
        val === "null" ||
        val === {} ||
        val === [] ||
        val.length === 0 
    );
};

export default isNullOrEmpty;
