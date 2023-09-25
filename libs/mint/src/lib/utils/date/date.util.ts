export function getDayOfWeek() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    return weekday[dateObj.getDay()]; 
}

export class DateUtil{}