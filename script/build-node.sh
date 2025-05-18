for f in ./node/*.ts
do
fn="$(basename -s .ts $f)"
# echo $fn
npm run esbuild node/$fn.ts -- --bundle --platform=node --packages=external --outfile=build/node/$fn.js --format=esm
done
