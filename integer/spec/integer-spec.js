"use strict";
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
var integer_1 = require('../src/integer');
describe("Integer", function () {
    it("zero", function () {
        expect(integer_1.default.zero.toString()).toEqual('0');
    });
    it("one", function () {
        expect(integer_1.default.one.toString()).toEqual('1');
    });
    it("num", function () {
        expect(integer_1.default.num(0).toString()).toEqual('0');
        expect(integer_1.default.num(0).eq(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.num(1).toString()).toEqual('1');
        expect(integer_1.default.num(123456789).toString()).toEqual('123456789');
        expect(integer_1.default.num(-2147483647).toString()).toEqual('-2147483647');
        expect(integer_1.default.num(1234567890).toString()).toEqual('1234567890');
        expect(integer_1.default.num(0x7fffffff).toString(16)).toEqual('7fffffff');
    });
    it("str", function () {
        expect(integer_1.default.str('0').eq(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.str('00').eq(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.str('+111', 2).toString()).toEqual('7');
        expect(integer_1.default.str('-1234567', 8).toString()).toEqual('-342391');
        expect(integer_1.default.str('ffffffff', 16).toString()).toEqual('4294967295');
    });
    it("exp", function () {
        expect(integer_1.default.exp('1000').toString()).toEqual('1000');
        expect(integer_1.default.exp('1e3').toString()).toEqual('1000');
        expect(integer_1.default.exp('3.14e+4').toString()).toEqual('31400');
        expect(integer_1.default.exp('314e-2').toString()).toEqual('3');
    });
    it("any", function () {
        expect(integer_1.default.any(null).eq(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.any(12345678900).toString()).toEqual('12345678900');
        expect(integer_1.default.any(-0x7fffffff).toString(16)).toEqual('-7fffffff');
        expect(integer_1.default.any(1234567).toString()).toEqual('1234567');
        expect(integer_1.default.any(3.14).toString()).toEqual('3');
        expect(integer_1.default.any('7654321').toString()).toEqual('7654321');
        expect(integer_1.default.any('1e3').toString()).toEqual('1000');
    });
    it("equal", function () {
        expect(integer_1.default.num(0).equal(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.num(1).equal(integer_1.default.one)).toBe(true);
        expect(integer_1.default.str('0').equal(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.str('1').equal(integer_1.default.one)).toBe(true);
        expect(integer_1.default.any('0').equal(integer_1.default.zero)).toBe(true);
        expect(integer_1.default.any('1').equal(integer_1.default.one)).toBe(true);
    });
    it("toString", function () {
        var a = integer_1.default.str('1234567890');
        expect(a.toString()).toEqual('1234567890');
        expect(a.toString(2)).toEqual('1001001100101100000001011010010');
        expect(a.toString(8)).toEqual('11145401322');
        expect(a.toString(16)).toEqual('499602d2');
    });
    it("is", function () {
        var a = integer_1.default.str('1234567890987654321');
        var z = integer_1.default.zero;
        expect(a.isOdd()).toBe(true);
        expect(a.isEven()).toBe(false);
        expect(a.isNonZero()).toBe(true);
        expect(z.isOdd()).toBe(false);
        expect(z.isEven()).toBe(true);
        expect(z.isNonZero()).toBe(false);
    });
    it("get", function () {
        var a = integer_1.default.num((1 << 16) + 2);
        expect(a.sign).toBe(true);
        expect(a.arrayLength).toEqual(2);
        expect(a.capacity >= a.arrayLength).toBe(true);
        var ds = a.digits;
        expect(ds[1]).toEqual(1);
        expect(ds[0]).toEqual(2);
    });
    it("basic", function () {
        var a = integer_1.default.str('1234567890');
        var b = integer_1.default.num(10).pow(7);
        expect(a.toString()).toEqual('1234567890');
        expect(a.clone().toString()).toEqual('1234567890');
        expect(a.neg().toString()).toEqual('-1234567890');
        expect(b.toString()).toEqual('10000000');
        expect(a.add(b).toString()).toEqual('1244567890');
        expect(a.sub(b).toString()).toEqual('1224567890');
        expect(a.mul(b).toString()).toEqual('12345678900000000');
        expect(a.div(b).toString()).toEqual('123');
        expect(a.mod(b).toString()).toEqual('4567890');
        expect(a.square().toString()).toEqual('1524157875019052100');
        expect(a.sqrt().toString()).toEqual('35136');
        expect(a.gcd(b).toString()).toEqual('10');
        expect(a.gcdBin(b).toString()).toEqual('10');
        expect(b.gcdBin(a).toString()).toEqual('10');
    });
    it("add", function () {
        var a = integer_1.default.num(1e7);
        var one = integer_1.default.one;
        var mOne = one.neg();
        expect(a.add(integer_1.default.zero).toString()).toEqual('10000000');
        expect(a.add(one).toString()).toEqual('10000001');
        expect(a.add(mOne).toString()).toEqual('9999999');
        expect(mOne.add(a).toString()).toEqual('9999999');
        expect(a.add(a).toString()).toEqual('20000000');
    });
    it("sub", function () {
        var a = integer_1.default.num(1e7);
        var one = integer_1.default.one;
        var mOne = one.neg();
        expect(a.sub(integer_1.default.zero).toString()).toEqual('10000000');
        expect(a.sub(one).toString()).toEqual('9999999');
        expect(a.sub(mOne).toString()).toEqual('10000001');
        expect(a.sub(a).toString()).toEqual('0');
        expect(one.sub(a).toString()).toEqual('-9999999');
        expect(mOne.sub(a).toString()).toEqual('-10000001');
        expect(integer_1.default.zero.sub(a).toString()).toEqual('-10000000');
    });
    it("mul", function () {
        var a = integer_1.default.num(1e7);
        expect(a.mul(integer_1.default.zero).toString()).toEqual('0');
        expect(a.mul(integer_1.default.one).toString()).toEqual('10000000');
        expect(a.mul(a).toString()).toEqual('100000000000000');
        expect(integer_1.default.one.neg().mul(a).toString()).toEqual('-10000000');
    });
    it("kmul", function () {
        var a = integer_1.default.exp('1e777');
        expect(a.kmul(integer_1.default.zero).toString()).toEqual('0');
        expect(integer_1.default.zero.kmul(a).toString()).toEqual('0');
        expect(a.kmul(integer_1.default.one).toString()).toEqual(a.toString());
        expect(a.kmul(a).toString()).toEqual(integer_1.default.exp('1e1554').toString());
    });
    it("div", function () {
        var a = integer_1.default.num(1e7);
        expect(function () { a.div(integer_1.default.zero); }).toThrow();
        expect(a.div(integer_1.default.one).toString()).toEqual('10000000');
        expect(a.div(a).toString()).toEqual('1');
        expect(integer_1.default.one.neg().div(a).toString()).toEqual('0');
    });
    it("mod", function () {
        var a = integer_1.default.num(1e7);
        expect(function () { a.mod(integer_1.default.zero); }).toThrow();
        expect(a.mod(integer_1.default.one).toString()).toEqual('0');
        expect(a.mod(a).toString()).toEqual('0');
        expect(integer_1.default.one.neg().mod(a).toString()).toEqual('-1');
    });
    it("shift", function () {
        var one = integer_1.default.one;
        var two = integer_1.default.num(2);
        var ls7 = one.leftShift(7);
        var ls17 = one.leftShift(17);
        var ls27 = one.leftShift(27);
        var ls37 = one.leftShift(37);
        var ls47 = one.leftShift(47);
        expect(ls7.toString()).toEqual('128');
        expect(ls17.toString()).toEqual('131072');
        expect(ls27.toString()).toEqual('134217728');
        expect(ls37.toString()).toEqual('137438953472');
        expect(ls47.toString()).toEqual('140737488355328');
        expect(two.pow(0).toString()).toEqual('1');
        expect(two.pow(7).toString()).toEqual('128');
        expect(two.pow(17).toString()).toEqual('131072');
        expect(two.pow(27).toString()).toEqual('134217728');
        expect(two.pow(37).toString()).toEqual('137438953472');
        expect(two.pow(47).toString()).toEqual('140737488355328');
        expect(ls7.rightShift(7).toString()).toEqual('1');
        expect(ls17.rightShift(17).toString()).toEqual('1');
        expect(ls27.rightShift(27).toString()).toEqual('1');
        expect(ls37.rightShift(37).toString()).toEqual('1');
        expect(ls47.rightShift(47).toString()).toEqual('1');
    });
    it("factorial", function () {
        expect(integer_1.default.factorial(0).toString()).toEqual('1');
        expect(integer_1.default.factorial(1).toString()).toEqual('1');
        expect(integer_1.default.factorial(2).toString()).toEqual('2');
        expect(integer_1.default.factorial(3).toString()).toEqual('6');
        expect(integer_1.default.factorial(10).toString()).toEqual('3628800');
        expect(integer_1.default.factorial(17).toString()).toEqual('355687428096000');
        expect(integer_1.default.factorial(20).toString()).toEqual('2432902008176640000');
    });
    it("sqrt", function () {
        expect(integer_1.default.zero.sqrt().toString()).toEqual('0');
        expect(integer_1.default.one.sqrt().toString()).toEqual('1');
        expect(integer_1.default.num(4).sqrt().toString()).toEqual('2');
        expect(integer_1.default.num(77).sqrt().toString()).toEqual('8');
        expect(integer_1.default.str('1000000').sqrt().toString()).toEqual('1000');
        expect(integer_1.default.str('10000000000').sqrt().toString()).toEqual('100000');
        expect(integer_1.default.exp('1e20').sqrt().toString()).
            toEqual(integer_1.default.exp('1e10').toString());
    });
    it("gcd", function () {
        var a = integer_1.default.exp('1e20');
        expect(a.gcd(integer_1.default.zero)).toEqual(a);
        expect(a.gcd(integer_1.default.one).toString()).toEqual('1');
        expect(a.gcd(a).toString()).toEqual(a.toString());
        expect(a.gcd(integer_1.default.num(10)).toString()).toEqual('10');
        expect(a.gcd(integer_1.default.exp('1e10')).toString()).
            toEqual(integer_1.default.exp('1e10').toString());
        expect(a.gcdBin(integer_1.default.zero)).toEqual(a);
        expect(a.gcdBin(integer_1.default.one).toString()).toEqual('1');
        expect(a.gcdBin(a).toString()).toEqual(a.toString());
        expect(a.gcdBin(integer_1.default.num(10)).toString()).toEqual('10');
        expect(a.gcdBin(integer_1.default.exp('1e10')).toString()).
            toEqual(integer_1.default.exp('1e10').toString());
    });
    it("fib", function () {
        var fib = function (a) {
            var b = integer_1.default.zero;
            for (var i = 0, c = integer_1.default.one, d = void 0; i < a; ++i) {
                d = b.clone();
                b = b.add(c);
                c = d;
            }
            return b;
        };
        expect(fib(0).toString()).toEqual('0');
        expect(fib(1).toString()).toEqual('1');
        expect(fib(2).toString()).toEqual('1');
        expect(fib(3).toString()).toEqual('2');
        expect(fib(4).toString()).toEqual('3');
        expect(fib(38).toString()).toEqual('39088169');
    });
    it("pi", function () {
        var pi = function (a) {
            if (!a) {
                a = 1;
            }
            var n = integer_1.default.num(10).pow(a);
            function arccot(m) {
                var c = n, a = c.div(m), b = a.clone(), m2 = m.square(), k = integer_1.default.num(1), s = true, l2 = integer_1.default.num(2);
                while (c.isNonZero()) {
                    b = b.div(m2);
                    k = k.add(l2);
                    c = b.div(k);
                    s = !s;
                    if (s) {
                        a = a.add(c);
                    }
                    else {
                        a = a.sub(c);
                    }
                }
                return a;
            }
            var a5 = arccot(integer_1.default.num(5));
            var a239 = arccot(integer_1.default.num(239));
            return a5.leftShift(2).sub(a239).leftShift(2);
        };
        var p = '314159265358979323846264338327950288419716939937510582097494459230781640628620948';
        expect(pi(80).toString()).toEqual(p);
    });
});
//# sourceMappingURL=integer-spec.js.map