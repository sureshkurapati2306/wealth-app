/* 
    Need refactoring to accept dynamic key value
*/
export const fundSort = (array, sortValue) => {
    if (sortValue === 'fundNameAsc') {
        return array.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    if (sortValue === 'fundNameDsc') {
        return array.sort((a, b) => a.fund_name.localeCompare(b.fund_name)).reverse();
    }
    if (sortValue === 'assetAsc') {
        return array.sort((a, b) => a.class_name.localeCompare(b.class_name));
    }
    if (sortValue === 'assetDsc') {
        return array.sort((a, b) => a.class_name.localeCompare(b.class_name)).reverse();
    }
    if (sortValue === 'navPriceAsc') {
        return array.sort((a, b) => a.nav_price - b.nav_price);
    }
    if (sortValue === 'navPriceDsc') {
        return array.sort((a, b) => a.nav_price - b.nav_price).reverse();
    }
    if (sortValue === 'perf1Asc') {
        return array.sort((a, b) => a.one_month - b.one_month);
    }
    if (sortValue === 'perf1Dsc') {
        return array.sort((a, b) => a.one_month - b.one_month).reverse();
    }
    if (sortValue === 'perf3Asc') {
        return array.sort((a, b) => a.three_month - b.three_month);
    }
    if (sortValue === 'perf3Dsc') {
        return array.sort((a, b) => a.three_month - b.three_month).reverse();
    }
};
