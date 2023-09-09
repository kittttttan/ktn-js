export function args(): string[] {
    // for node.js
    if (typeof process !== 'undefined') {
        return process.argv.slice(2);
    }

    // for Deno
    if (typeof Deno !== 'undefined') {
        return Deno.args;
    }

    // for Bun
    if (typeof Bun !== 'undefined') {
        return Bun.argv.slice(3);
    }

    return [];
}