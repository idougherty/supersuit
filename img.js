export const images = [];

const imageProm = img =>
  new Promise((resolve, reject) => {
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => reject());
  });

export function loadImageNow(src) {
  const img = new Image();
  img.src = src;
  return imageProm(img);
}

export function loadImage(src) {
  const img = new Image();
  img.src = "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  setTimeout(() => {
    img.src = src;
    images.push(imageProm(img));
  }, 100);
  return img;
}
