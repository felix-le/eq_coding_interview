var array = [
  {
    name: 'foo1',
    value: 'val1',
  },
  {
    name: 'foo1',
    value: ['val2', 'val3'],
  },
  {
    name: 'foo2',
    value: 'val4',
  },
];
function mergeArrFn(arr1, agr) {
  let newArr1 = [...arr1];
  let output = [];
  newArr1.forEach(function (item) {
    let existing = output.filter(function (v, i) {
      return v[agr] === item[agr];
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = output[existingIndex].value.concat(
        item.value
      );
    } else {
      if (typeof item.value == 'string') item.value = [item.value];
      output.push(item);
    }
  });
  return output;
}
const arr = mergeArrFn(array, 'name');
console.log('🚀 ~ file: test.js ~ line 36 ~ arr', arr);
