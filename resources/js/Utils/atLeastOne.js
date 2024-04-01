import isNullOrEmpty from "./isNullOrEmpty";

// mustTrue for object
const atLeastOne = (obj, list) => {
    if (typeof list === "string") {
        list = list.replace(/ /g, "").split(",");
    }

    let data = {
        status: false,
        data: [],
    };

    for (let prop of list) {
        let val = obj[prop];
        if (!isNullOrEmpty(val) || val == true) {
            data = {
                status: true,
                data: prop,
            };
        }
    }
    return data;
};

export default atLeastOne;
