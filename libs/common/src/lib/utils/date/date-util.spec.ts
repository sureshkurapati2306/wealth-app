import { getDayOfWeek, getTimeOfDay } from './date-util';

describe('Testing dayOfWeek', () => {
    it('Should return day of week', () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    const mockDay = weekday[dateObj.getDay()]; 
    const day= getDayOfWeek();
        expect(mockDay).toEqual(day);
    });    
});

describe('Testing getTimeOfDay', () => {
    it('Should return day of Time', () => {        
    const dateObj = new Date();
    const mockTime = dateObj.getDay()+":"+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();  
    const dayTime= getTimeOfDay();
        expect(mockTime).toEqual(dayTime);
    });    
});