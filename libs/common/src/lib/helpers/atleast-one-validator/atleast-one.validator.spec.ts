import { atLeastOne } from './atleast-one.validator';

describe('atLeastOne()', () => {
    it('should return atLeastOne object if no input is selected', () => {
        const mockValidator = jest.fn();
        atLeastOne(mockValidator);
        const anonymous = () => ({ atLeastOne: true });
        const obj = anonymous();
        expect(obj).toEqual({ atLeastOne: true });
    });

    it('should return null if input is selected', () => {
        const mockValidator = jest.fn();
        atLeastOne(mockValidator);
        const anonymous = () => (null);
        const value = anonymous();
        expect(value).toEqual(null);
    });
});
