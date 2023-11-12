import {guessBoolean} from "../guessBoolean";

describe('guessBoolean', () => {
    describe('positive', () => {
        it('should return true if lower cases true string', () => {
            expect(guessBoolean('true')).toBe(true);
        });

        it('should return true if mixed cases true string', () => {
            expect(guessBoolean('True')).toBe(true);
        });

        it('should return true if upper cases true string', () => {
            expect(guessBoolean('TRUE')).toBe(true);
        });

        it('should return true if yes string', () => {
            expect(guessBoolean('yes')).toBe(true);
        });

        it('should return true if 1 string', () => {
            expect(guessBoolean('1')).toBe(true);
        });

        it('should return true if true boolean', () => {
            expect(guessBoolean(true)).toBe(true);
        });

        it('should return true if 1 number', () => {
            expect(guessBoolean(1)).toBe(true);
        });

        it('should return true if non-empty array', () => {
            expect(guessBoolean([1])).toBe(true);
        });

        it('should return true if non-empty object', () => {
            expect(guessBoolean({a: 1})).toBe(true);
        });

    });

    describe('negative', () => {
        it('should return false if false string', () => {
            expect(guessBoolean('false')).toBe(false);
        });

        it('should return false if no string', () => {
            expect(guessBoolean('no')).toBe(false);
        });

        it('should return false if 0 string', () => {
            expect(guessBoolean('0')).toBe(false);
        });

        it('should return false if false boolean', () => {
            expect(guessBoolean(false)).toBe(false);
        });

        it('should return false if 0 number', () => {
            expect(guessBoolean(0)).toBe(false);
        });

        it('should return false if null', () => {
            expect(guessBoolean(null)).toBe(false);
        });

        it('should return false if undefined', () => {
            expect(guessBoolean(undefined)).toBe(false);
        });

        it('should return false if NaN', () => {
            expect(guessBoolean(NaN)).toBe(false);
        });

        it('should return false if any other string', () => {
            expect(guessBoolean('any other string')).toBe(false);
        });

        it('should return false if empty array', () => {
            expect(guessBoolean([])).toBe(false);
        });

        it('should return false if empty object', () => {
            expect(guessBoolean({})).toBe(false);
        });
    });
});