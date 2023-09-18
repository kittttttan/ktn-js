export function shuffleArray(a: any[]) {
    for (let i = a.length - 1; i >= 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [a[i], a[r]] = [a[r], a[i]];
    }
}