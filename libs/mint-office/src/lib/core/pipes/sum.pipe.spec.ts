import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
  it('create an instance', () => {
    const pipe = new SumPipe();
    expect(pipe).toBeTruthy();
  });

  it('calculates the sum of [1,2,3] as 6', () => {
    const pipe = new SumPipe();

    const inputArray = [1, 2, 3];

    const expectedResult = 6;

    expect(pipe.transform(inputArray)).toStrictEqual(expectedResult);
  });

  it('calculates the sum of array of object as 6', () => {
    const pipe = new SumPipe();

    const inputArray = [
      { amount: 1, name: 'John'}, 
      { amount: 2, name: 'Jane'}, 
      { amount: 3, name: 'Mike'}
    ];

    const expectedResult = 6;

    expect(pipe.transform(inputArray, 'amount')).toStrictEqual(expectedResult);
  });

});
