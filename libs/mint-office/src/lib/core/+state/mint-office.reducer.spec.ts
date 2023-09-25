import { reducer, initialState } from './mint-office.reducer';
import * as Actions from './mint-office.actions';

describe('MintOffice Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('updateCimbFooterClass action', () => {
    it('should update the cimb footer class', () => {
      const action = Actions.updateCimbFooterClass({
        className: 'myClass'
      });

      const result = reducer(initialState, action);

      expect(result.cimbFooterClass).toEqual('myClass');
    });
  });
});
