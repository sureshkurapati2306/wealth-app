import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeConversion',
})
export class TimeConversionPipe implements PipeTransform {
    transform(value: string): string {
        const [hours, minutes] = value.split(':');
        let convertedTime = '';

        // Convert hours to 12-hour format
        let parsedHours = parseInt(hours, 10) % 12;
        if (parsedHours === 0) {
            parsedHours = 12;
        }

        convertedTime += `${parsedHours}:${minutes} ${parseInt(hours, 10) >= 12 ? 'PM' : 'AM'}`;

        return convertedTime;
    }
}
