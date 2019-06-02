export class Crate {
  constructor(xPos, yPos) {
    this.width = 192;
    this.height = 192;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "#bd9647";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
