export function getDayOfWeek() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    return weekday[dateObj.getDay()];     
}
export function getTimeOfDay() {    
    const dateObj = new Date();
    return dateObj.getDay()+":"+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds(); 
}

export class DateUtil{}