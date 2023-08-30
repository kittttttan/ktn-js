export function groupBy(collection, key) {
    return collection.reduce((previous, current) => {
        if (!previous[current[key]]) {
            previous[current[key]] = [];
        }

        previous[current[key]].push(current);
        return previous;
    }, {});
}

const c = [
    { 'c1': 'c', 'c2': 'C', 'c3': 3 },
    { 'c1': 'a', 'c2': 'A', 'c3': 1 },
    { 'c1': 'a', 'c2': 'B', 'c3': 1 },
    { 'c1': 'b', 'c2': 'A', 'c3': 2 },
    { 'c1': 'a', 'c2': 'C', 'c3': 1 },
    { 'c1': 'b', 'c2': 'B', 'c3': 2 },
    { 'c1': 'b', 'c2': 'C', 'c3': 2 },
];
console.log(groupBy(c, 'c2'));
