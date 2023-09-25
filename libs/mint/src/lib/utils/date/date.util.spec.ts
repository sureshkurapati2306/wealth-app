import { getDayOfWeek } from './date.util';

describe('Testing dayOfWeek', () => {
    it('Should return day of week', () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dateObj = new Date();
    const mockDay = weekday[dateObj.getDay()]; 
    const day= getDayOfWeek();
        expect(mockDay).toEqual(day);
    });    
});
