import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(input: any[], property?: string): number {

    let sum = 0;

    if(property !== undefined) {
      //summing array of objects by property
      sum = input.reduce((a, item) => {
        return a + item[property]
      }, 0);
    } else {
      //summing array of numbers
      sum = (input as number[]).reduce((a, item) => {
        return a + item
      }, 0);
    }

    return sum;
    
  }

}
