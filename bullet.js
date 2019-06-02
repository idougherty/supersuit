import { isCollidingCircleEntities, removeIf } from "./util.js";

export class Bullet {
  constructor(xPos, yPos, vector, tag) {
    this.x = xPos;
    this.y = yPos;
    this.radius = 2;
    this.vector = vector;
    this.speed = 3;
    this.size = 4;
    this.tag = tag;
  }

  update(player, game) {
    this.x += this.vector[0] * this.speed;
    this.y += this.vector[1] * this.speed;
    switch (this.tag) {
      case "enemy":
        if (isCollidingCircleEntities(this, player)) {
          alert(
            "OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! " +
              "The code monkeys at our headquarters are working VEWY HAWD to fix this!"
          );
        }
      case "player":
        removeIf(game.enemies, enemy => isCollidingCircleEntities(this, enemy));
    }
  }

  draw() {
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.size);
  }
}
