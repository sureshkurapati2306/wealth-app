import { MapToFlatArrayPipe } from './map-to-flat-array.pipe';

describe('MapArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new MapToFlatArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "Abc"', () => {
    const pipe = new MapToFlatArrayPipe();

    const inputArray = [
      { id: 1, name: 'John'}, 
      { id: 2, name: 'Jane'}, 
      { id: 3, name: 'Mike'}
    ];

    const expectedArray = ['John', 'Jane', 'Mike'];

    expect(pipe.transform(inputArray, 'name')).toStrictEqual(expectedArray);
  });
});
