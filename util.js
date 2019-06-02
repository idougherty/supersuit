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

export const isCollidingCircle = (x1, y1, r1, x2, y2, r2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= r1 + r2;

export const isCollidingCircleEntities = (a, b) =>
  isCollidingCircle(
    a.x + a.width / 2,
    a.y + a.height / 2,
    a.radius,
    b.x + b.width / 2,
    b.y + b.height / 2,
    b.radius
  );

export const isCollidingRect = (x1, y1, w1, h1, x2, y2, w2, h2) =>
  x1 + w1 > x2 && y1 + h1 > y2 && x1 < x2 + w2 && y1 < y2 + h2;

export const isCollidingRectEntities = (a, b) =>
  isCollidingRect(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height);

export const entityCenter = entity => [
  entity.x + entity.width / 2,
  entity.y + entity.height / 2
];
