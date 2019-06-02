class Trapdoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 64;
    this.width = 64;
    this.open = false;
  }

  draw() {
    c.fillStyle = "brown";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}
