import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToFlatArray'
})
export class MapToFlatArrayPipe implements PipeTransform {

  /**
   * Flatten an array of objects based on the specified property and return the flatten array.
   * @param inputArray Array of objects
   * @param propertyToExtract The property name you want to extract from the array of objects
   * @returns The flatten array.
   */
  transform(inputArray: Record<string, unknown>[], propertyToExtract: string): any[] {

    /*
    inputArray = [{ id: 1, name: 'John'}, { id: 2, name: 'Jane'}, { id: 3, name: 'Mike'}]
    
    {{ inputArray| mapToFlatArrayPipe: 'name' }}

    Returns: ['John', 'Jane', 'Mike']
    */

    return inputArray.map(item => {
      return item[propertyToExtract];
    });

  }

}
