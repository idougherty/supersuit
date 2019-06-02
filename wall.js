export class Wall {
  constructor(xPos, yPos) {
    this.width = 64;
    this.height = 192;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "#999999";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
