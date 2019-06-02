export class Crate {
  constructor(xPos, yPos) {
    this.width = 192;
    this.height = 192;
    this.x = xPos;
    this.y = yPos;
    this.texture = "";
  }

  draw(c) {
    c.fillStyle = "#bd9647";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
