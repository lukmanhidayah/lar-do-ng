import isNullOrEmpty from "./isNullOrEmpty";

// mustTrue for object
const checkObject = (obj, list, mustTrue = false) => {
    if (typeof list === "string") {
        list = list.replace(/ /g, "").split(",");
    }

    for (let prop of list) {
        let val = obj[prop];
        if (isNullOrEmpty(val) || (mustTrue && val == false)) {
            return {
                status: false,
                data: prop,
            };
        }
    }

    return {
        status: true,
        data: null,
    };
};

export default checkObject;
