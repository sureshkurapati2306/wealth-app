import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanAccNum'
})
export class LoanAccNumPipe implements PipeTransform {

  transform(value: string): string {
    const slice1 = value.slice(0,2);
    const slice2 = value.slice(2,9);
    const slice3 = value.slice(9,12)
    return slice1 + ' ' + slice2 + ' ' + slice3;
  }

}
