import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'localDateToUtc'
})
export class LocalDateToUtcPipe implements PipeTransform {

  /**
   * Convert a local Date object to a UTC string such as 2022-01-05T16:00:00
   * @param localDate Date object in local timezone
   * @returns string such as 2022-01-05T16:00:00
   */
  transform(localDate: Date): string {
    
    const isoDateTime = localDate.toISOString();
    
    return `${isoDateTime.substr(0, 10)}T${isoDateTime.substr(11, 8)}`;

  }

}
