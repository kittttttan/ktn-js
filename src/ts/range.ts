/**
 * range like python3
 */

/**
 * @public
 * @param {number} start
 * @param {number=} end
 * @param {number=} step
 * @return {!Iterator}
 */
export function range(start: number, end?: number, step?: number): Iterator<number> {
    return (function *() {
        if (typeof(step) === 'undefined') {
            step = 1;
        }
        if (typeof(end) === 'undefined') {
            end = start;
            start = 0;
        }
        if (step === 0) {
            throw new Error('range() arg 3 must not be zero');
        } else if (step > 0) {
            if (start > end) {
                end = start;
            }
            while (start < end) {
                yield start;
                start += step;
            }
        } else {
            if (start < end) {
                end = start;
            }
            while (start > end) {
                yield start;
                start += step;
            }
        }
    }());
}
