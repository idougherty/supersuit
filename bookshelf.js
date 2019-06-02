export class Bookshelf {
  constructor(xPos, yPos) {
    this.width = 256;
    this.height = 64;
    this.xPos = xPos;
    this.yPos = yPos;
    this.texture = "";
  }

<<<<<<< HEAD
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
=======
  draw() {
    c.fillStyle = "brown";
    c.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
>>>>>>> aecd8ebc02e79bcd5ab02e50353632eac4a20e84
