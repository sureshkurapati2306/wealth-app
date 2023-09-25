import { MatPaginatorIntlCustom } from './CustomPaginatorIntl';

describe('MatPaginatorIntlCustom', () => {

  it('create an instance', () => {
    const matPaginatorIntlCustom = new MatPaginatorIntlCustom();
    expect(matPaginatorIntlCustom).toBeTruthy();
  });

  it('should getRangeLabel', () => {
    const matPaginatorIntlCustom = new MatPaginatorIntlCustom();
    const label = matPaginatorIntlCustom.getRangeLabel(1, 10, 100);
    expect(label).toEqual('Page 2 of 10');
  });

});