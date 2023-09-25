import { LoanAccNumPipe } from './loan-acc-num.pipe';

describe('LoanAccNumPipe', () => {
  it('Account Number Pipe', () => {
    const pipe = new LoanAccNumPipe();
    const accNum = '100306851354';

    expect(pipe.transform(accNum)).toBe('10 0306851 354');
  });
});
