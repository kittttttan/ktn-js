/// <reference path="./ktn.d.ts" />
/// <reference path="./complex.d.ts" />
//import Complex from '@ktn/complex';
type Complex = any;

declare module '@ktn/fft'{
  export default class Fft {
    public static fl2Comp(x: double[]): Complex[];
    protected static _fft2(x: Complex[]): Complex[];
    protected static _fft4(x: Complex[]): Complex[];
    protected static _fft(x: Complex[]): Complex[];
    public static fft(x: Complex[]): Complex[];
    public static ifft(x: Complex[]): Complex[];
    public static fftFloat(x: number[]): Complex[];
    public static ifftFloat(x: number[]): Complex[];
}
