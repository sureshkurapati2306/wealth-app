import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipsList',
})
export class TooltipsListPipe implements PipeTransform {
  transform(lines: string[]): string {
    let list = '';

    lines.forEach((line) => {
      list += '• ' + line + '\n';
    });

    return list;
  }
}
