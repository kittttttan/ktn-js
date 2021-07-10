onmessage = (e) => {
  console.log('onmessage', e);
  postMessage({type: 'factors', arg: e.data, value: factors(e.data)});
};

WebAssembly.instantiateStreaming(fetch('../wasm/addTwo.wasm'), {})
.then(obj => onLoad(obj));

const onLoad = (obj) => {
  postMessage({type: 'ready', value: true});
  const { addTwo } = obj.instance.exports;
  console.log(addTwo(1, 2));
};

function factors(n) {
  let arr = [];
  if (n < 2) {
    return arr;
  }

  for (let i = 2; i * i <= n; i++) {
    let e = 0;
    while (n % i === 0) {
      e++;
      n /= i;
    }
    if (e !== 0) {
      arr.push([i, e]);
    }
  }
  if (n > 1) {
    arr.push([n, 1]);
  }

  return arr;
}
