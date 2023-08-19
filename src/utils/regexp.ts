export function uri(): RegExp { return /\w+:\/\/[\w\-./?%&=:@;]*/g; }
export function xmlTag(): RegExp { return /<\/?\w+[^>]*>/g; }
export function cComment(): RegExp { return /\/\*[\s\S]*?\*\//gm; }
export function lineComment(): RegExp { return /\/\/.*$/gm; }
export function doubleQuote(): RegExp { return /"([^\\"\n]|\\.)*"/g; }
