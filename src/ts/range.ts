/**
 * range like python3
 */

/**
 * @public
 * @param {double} start
 * @param {double=} end
 * @param {double=} step
 * @return {!Iterator}
 */
export function range(start: double, end?: double, step?: double): Iterator<double> {
    start = +start;
    if (typeof(step) === 'undefined') {
        step = 1;
    }
    if (typeof(end) === 'undefined') {
        end = start;
        start = 0;
    }
    end = +end;
    step = +step;
    return (function *() {
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
