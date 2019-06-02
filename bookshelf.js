import { Obstacle } from "./obstacle.js"

class Bookshelf extends Obstacle {
	constructor(xPos, yPos){
		this.width = 256;
		this.height = 64;
		this.x = xPos;
		this.y = yPos;
		this.texture = "";
	}
	
	draw(){
		c.fillStyle = "brown"
		c.fillRect(this.x, this.y, this.width, this.height);
	}
}