export class Bookshelf {
  constructor(xPos, yPos) {
    this.width = 256;
    this.height = 64;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

  draw() {
    c.fillStyle = "brown";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
