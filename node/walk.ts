import * as fs from 'fs';
import * as path from 'path';

export function walk(p, fileCallback, errCallback) {
    fs.readdir(p, (err, files) => {
        if (err) {
            errCallback(err);
            return;
        }
        files.forEach((f) => {
            const fp = path.join(p, f);
            if (fs.statSync(fp).isDirectory()) {
                walk(fp, fileCallback, errCallback);
            } else {
                fileCallback(fp);
            }
        });
    });
};

export async function* walkAsync(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) {
            yield* walkAsync(entry);
        } else if (d.isFile()) {
            yield entry;
        }
    }
}
