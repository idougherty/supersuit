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

export class Crachead extends Enemy {
  constructor(xPos, yPos) {
    super(xPos, yPos);
    this.texture = "";
  }

  update(player, game) {
    var dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    var direction_vector = [(player.x - this.x) / dist, (player.y - this.y) / dist];
    this.x += direction_vector[0] * 4;
    this.y += direction_vector[1] * 4;
  }
}

export class GuyThatShootsYou extends Enemy {
  constructor(xPos, yPos) {
    super(xPos, yPos);
    this.texture = "";
  }
  
  update(player, game) {
    var dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2);
    var direction_vector = [(player.x - this.x) / dist, (player.y - this.y) / dist];
  }
}