import { TooltipsListPipe } from './tooltips-list.pipe';

describe('TooltipsListPipe', () => {
  it('Tooltips List pipe', () => {
    const pipe = new TooltipsListPipe();
    const tootipsList = ["Apple", "Orange"];

    expect(pipe.transform(tootipsList)).toBe(
      `• Apple
• Orange
`)
  });
});
