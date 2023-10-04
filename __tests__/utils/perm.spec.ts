import { expect, test } from 'vitest'
import { permutations } from '../../src/utils/perm'

test("permutations", () => {
    expect([...permutations([])]).toStrictEqual([[]]);
    expect([...permutations([1])]).toStrictEqual([[1]]);

    expect([...permutations([1, 2])]).toStrictEqual([
        [1, 2],
        [2, 1],
    ]);

    expect([...permutations([1, 2, 3])]).toStrictEqual([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
    ]);

    expect([...permutations([1, 1, 2])]).toStrictEqual([
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1],
    ]);
});
