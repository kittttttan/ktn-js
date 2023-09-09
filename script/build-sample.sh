for f in ./sample/*.ts
do
fn="$(basename -s .ts $f)"
# echo $fn
npm run esbuild sample/$fn.ts -- --bundle --platform=node --packages=external --outfile=build/sample/$fn.js
done
