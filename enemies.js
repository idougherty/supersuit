class Enemy
{
	constructor(xPos, yPos)
	{
		this.health = 1;
		this.x = xPos;
		this.y = yPos;
		this.width = 20;
		this.height = 20;
		this.texture = "";
	}

	draw()
	{
		c.fillStyle = "brown";
		c.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Guns extends Enemy
{
	constructor(xPos, yPos)
	{
		super(xPos, yPos);
		this.texture = "";
	}
}

class Cracheads extends Enemy
{
	constructor(xPos, yPos)
	{
		super(xPos, yPos);
		this.texture = "";
	}
}