"use strict";
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
var math_expression_1 = require('../src/math-expression');
describe("MathExpression", function () {
    it("+", function () {
        var a = [
            ['1 + 2', 'add(1,2)', '3'],
            ['1+2+3+4+5+6+7+8+9+10', 'add(add(add(add(add(add(add(add(add(1,2),3),4),5),6),7),8),9),10)', '55'],
            ['111111111111111111111 + 100000000000000000000', 'add(111111111111111111111,100000000000000000000)', '211111111111111111111'],
            ['1.2 + 2.1', 'add(1.2,2.1)', '33/10']
        ];
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var i = a_1[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.toString()).toEqual(i[1]);
            expect(p.calc().toString()).toEqual(i[2]);
        }
    });
    it("-", function () {
        var a = [
            ['1 - 2', 'add(1,-2)', '-1'],
            ['1-2-3-4-5-6-7-8-9-10', 'add(add(add(add(add(add(add(add(add(1,-2),-3),-4),-5),-6),-7),-8),-9),-10)', '-53'],
            ['111111111111111111111 - 100000000000000000000', 'add(111111111111111111111,-100000000000000000000)', '11111111111111111111']
        ];
        for (var _i = 0, a_2 = a; _i < a_2.length; _i++) {
            var i = a_2[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.toString()).toEqual(i[1]);
            expect(p.calc().toString()).toEqual(i[2]);
        }
    });
    it("*", function () {
        var a = [
            ['2 * 3', '6'],
            ['1*2*3*4*5*6*7*8*9*10', '3628800'],
            ['111111111111111111111 * 100000000000000000000', '11111111111111111111100000000000000000000']
        ];
        for (var _i = 0, a_3 = a; _i < a_3.length; _i++) {
            var i = a_3[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.calc().toString()).toEqual(i[1]);
        }
    });
    it("/", function () {
        var a = [
            ['6 / 3', 'div(6,3)', '2'],
            ['3628800/2/3/4/5/6/7/8/9', 'div(div(div(div(div(div(div(div(3628800,2),3),4),5),6),7),8),9)', '10'],
            ['11111111111111111111100000000000000000000 / 100000000000000000000', 'div(11111111111111111111100000000000000000000,100000000000000000000)', '111111111111111111111']
        ];
        for (var _i = 0, a_4 = a; _i < a_4.length; _i++) {
            var i = a_4[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.toString()).toEqual(i[1]);
            expect(p.calc().toString()).toEqual(i[2]);
        }
    });
    it("^", function () {
        var a = [
            ['2 ^ 3', '8'],
            ['2^3^4', '2417851639229258349412352']
        ];
        for (var _i = 0, a_5 = a; _i < a_5.length; _i++) {
            var i = a_5[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.calc().toString()).toEqual(i[1]);
        }
    });
    it("+-*/^", function () {
        var a = [
            ['1 + 2 - 3 * 4 / 5', 'add(add(1,2),div(mul(-3,4),5))', '3/5'],
            ['(1 + 2) * 3 ^ 2', 'mul(add(1,2),pow(3,2))', '27'],
            ['1 / (2 * 3)', 'div(1,mul(2,3))', '1/6'],
            ['1 / (2 + 3)', 'div(1,add(2,3))', '1/5']
        ];
        for (var _i = 0, a_6 = a; _i < a_6.length; _i++) {
            var i = a_6[_i];
            var p = math_expression_1.default.create(i[0]).eval();
            expect(p.toString()).toEqual(i[1]);
            expect(p.calc().toString()).toEqual(i[2]);
        }
    });
});
//# sourceMappingURL=math-expression-test.js.map