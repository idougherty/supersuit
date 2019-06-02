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

export function isCollidingCircle(x1, y1, r1, x2, y2, r2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= r1 + r2;
}

export function isCollidingRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 + w1 > x2 && y1 + h1 > y2 && x1 < x2 + w2 && y1 < y2 + h2;
}
