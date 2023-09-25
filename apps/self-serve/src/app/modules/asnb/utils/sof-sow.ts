import { CommonDropDown } from '../models';

export const getSofValue = (
    data: Record<string, string>,
    sourceOfWealthAndFund: CommonDropDown[],
): string => {
    if (data.sofOthers) return data.sofOthers;
    return sourceOfWealthAndFund.find((item) => item.id === data.sof)?.value;
};

export const getSowValue = (
    data: Record<string, string>,
    sourceOfWealthAndFund: CommonDropDown[],
): string => {
    if (data.sowOthers) return data.sowOthers;
    return sourceOfWealthAndFund.find((item) => item.id === data.sow)?.value;
};
