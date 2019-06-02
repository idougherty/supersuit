export class Enemy {
  constructor(xPos, yPos) {
    this.health = 1;
    this.x = xPos;
    this.y = yPos;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.texture = "";
  }

  update(_player, _game) {}

  draw(c) {
    c.fillStyle = "brown";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Guns extends Enemy {
  constructor(xPos, yPos) {
    super(xPos, yPos);
    this.texture = "";
  }
}

export class Crachead extends Enemy {
  constructor(xPos, yPos) {
    super(xPos, yPos);
    this.texture = "";
  }
}
