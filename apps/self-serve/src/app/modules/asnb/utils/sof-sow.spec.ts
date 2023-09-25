import { getSofValue, getSowValue } from './sof-sow';

describe('getSofValue', () => {
    it('should return the sof other value when option selected is other', () => {
        const result = getSofValue({ sofOthers: 'other value' }, [{ id: 'SAV', value: 'Saving' }]);
        expect(result).toStrictEqual('other value');
    });

    it('should return the sof value based on selected option', () => {
        const result = getSofValue({ sofOthers: 'SAV' }, [{ id: 'SAV', value: 'Saving' }]);
        expect(result).toStrictEqual('SAV');
    });
});

describe('getSowValue', () => {
    it('should return the sow other value when option selected is other', () => {
        const result = getSowValue({ sowOthers: 'other value' }, [{ id: 'SAV', value: 'Saving' }]);
        expect(result).toStrictEqual('other value');
    });

    it('should return the sow value based on selected option', () => {
        const result = getSowValue({ sowOthers: 'SAV' }, [{ id: 'SAV', value: 'Saving' }]);
        expect(result).toStrictEqual('SAV');
    });
});
