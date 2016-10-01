"use strict";
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
var rational_1 = require('../src/rational');
describe("Rational", function () {
    it("zero is 0", function () {
        expect(rational_1.default.zero.toString()).toEqual('0');
    });
    it("one is 1", function () {
        expect(rational_1.default.one.toString()).toEqual('1');
    });
    it("num", function () {
        expect(rational_1.default.num(0).toString()).toEqual('0');
        expect(rational_1.default.num(1).toString()).toEqual('1');
        expect(rational_1.default.num(123456789).toString()).toEqual('123456789');
        expect(rational_1.default.num(-2147483647).toString()).toEqual('-2147483647');
        expect(rational_1.default.num(36, -1024).toString()).toEqual('-9/256');
    });
    it("str", function () {
        expect(rational_1.default.str('0').eq(rational_1.default.zero)).toBe(true);
        expect(rational_1.default.str('00').eq(rational_1.default.zero)).toBe(true);
        expect(rational_1.default.str('1').eq(rational_1.default.one)).toBe(true);
        expect(rational_1.default.str('7').toString()).toEqual('7');
        expect(rational_1.default.str('-0.07').toString()).toEqual('-7/100');
        expect(rational_1.default.str('-777/7777').toString()).toEqual('-111/1111');
        expect(rational_1.default.str('0.01/1.234').toString()).toEqual('5/617');
        expect(rational_1.default.str('2.01/-10.5').toString()).toEqual('-67/350');
    });
    it("equal", function () {
        expect(rational_1.default.num(0).equal(rational_1.default.zero)).toBe(true);
        expect(rational_1.default.num(1).equal(rational_1.default.one)).toBe(true);
        expect(rational_1.default.str('0').equal(rational_1.default.zero)).toBe(true);
        expect(rational_1.default.str('1').equal(rational_1.default.one)).toBe(true);
        expect(rational_1.default.num(4, -6).equal(rational_1.default.str('-8/12'))).toBe(true);
    });
    it("output", function () {
        var r = rational_1.default.num(1, 3);
        expect(r.html()).toEqual('1/3');
        expect(r.tex()).toEqual('\\frac{1}{3}');
    });
    it("sign", function () {
        var r = rational_1.default.num(1, 3);
        expect(r.neg().toString()).toEqual('-1/3');
        expect(r.abs().toString()).toEqual('1/3');
        expect(r.neg().abs().toString()).toEqual('1/3');
    });
    it("inv", function () {
        expect(rational_1.default.num(2, 3).inv().toString()).toEqual('3/2');
        expect(rational_1.default.num(-6, 10).inv().toString()).toEqual('-5/3');
        expect(function () { rational_1.default.zero.inv(); }).toThrow();
    });
    it("basic", function () {
        var a = rational_1.default.num(2, 3);
        var b = rational_1.default.num(1, 6);
        expect(a.add(b).toString()).toEqual('5/6');
        expect(a.sub(b).toString()).toEqual('1/2');
        expect(a.mul(b).toString()).toEqual('1/9');
        expect(a.div(b).toString()).toEqual('4');
        expect(a.pow(2).toString()).toEqual('4/9');
        expect(a.add(b.neg()).toString()).toEqual('1/2');
        expect(a.sub(b.neg()).toString()).toEqual('5/6');
        expect(a.mul(b.neg()).toString()).toEqual('-1/9');
        expect(a.div(b.neg()).toString()).toEqual('-4');
        expect(a.neg().pow(2).toString()).toEqual('4/9');
    });
});
//# sourceMappingURL=rational-test.js.map