export class FireBarrel {
  constructor(xPos, yPos) {
    this.width = 64;
    this.height = 64;
    this.x = xPos;
    this.y = yPos;
    this.texture = "";
  }

  draw() {
    c.fillStyle = "orange";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
