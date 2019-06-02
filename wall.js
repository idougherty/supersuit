export class Wall {
  constructor(xPos, yPos) {
    this.width = 64;
    this.height = 192;
    this.x = xPos;
    this.y = yPos;
    this.texture = "";
  }

  draw() {
    c.fillStyle = "#999999";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
