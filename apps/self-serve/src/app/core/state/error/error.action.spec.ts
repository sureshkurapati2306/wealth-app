import {
  ADD_GLOBAL_ERROR,
  AddGlobalError
  


} from './error.action';

describe('Error' , ()=> {
  it('should create an action AddGlobalError', () => {
    const payload = '';
    const action = new AddGlobalError(payload);

    expect({ ...action }).toEqual({
      type: ADD_GLOBAL_ERROR,
      payload,
    });
  });



})


