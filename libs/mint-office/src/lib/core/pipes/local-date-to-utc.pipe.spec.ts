import { LocalDateToUtcPipe } from './local-date-to-utc.pipe';

describe('LocalDateToUtcPipe', () => {
  it('create an instance', () => {
    const pipe = new LocalDateToUtcPipe();
    expect(pipe).toBeTruthy();
  });
});
