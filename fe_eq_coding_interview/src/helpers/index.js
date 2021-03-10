export function combineFn(arr1, arr2, agr) {
  let newArr1 = [...arr1];
  let newArr2 = [...arr2];

  for (let i = 0; i < newArr1.length; i++) {
    for (let j = 0; j < newArr2.length; j++) {
      if (newArr1[i][agr] === newArr2[j][agr]) {
        newArr1[i] = {
          ...newArr1[i],
          ...newArr2[j],
        };
      }
    }
  }
  return newArr1;
}

export function mergeArrFn(arr1, agr) {
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
