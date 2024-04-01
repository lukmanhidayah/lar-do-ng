import addWeeks from "date-fns/addWeeks";

const isOneWeekBefore = (dateExpire) => {
    const date = new Date(dateExpire);
    const weekCompare = addWeeks(new Date(), 1);

    if (weekCompare.getTime() >= date.getTime()) return true;
    return false;
};

export default isOneWeekBefore;
