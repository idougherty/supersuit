export function removeIf(arr, callback) {
  var i = 0;
  while (i < arr.length) {
    if (callback(arr[i], i)) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
}
