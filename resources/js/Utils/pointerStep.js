const { default: isNullOrEmpty } = require("./isNullOrEmpty");

const pointerStep = (userStatus, comments) => {
    if (userStatus != 4) return 0;
    if (!isNullOrEmpty(comments.comment_data_umum)) return 0;
    if (!isNullOrEmpty(comments.comment_data_identitas)) return 1;
    if (!isNullOrEmpty(comments.comment_data_legalitas)) return 2;
    return 3;
};

export default pointerStep;
