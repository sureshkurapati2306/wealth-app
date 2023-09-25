import * as moment from 'moment';

export const validateAge = (year) => {
    const age = moment().diff(year, 'years');

    if (age) {
        if (age < 36) {
            return [1];
        } else if (age < 46) {
            return [2];
        } else if (age < 61) {
            return [3];
        } else if (age < 75) {
            return [4];
        } else {
            return [5];
        }
    }
};
