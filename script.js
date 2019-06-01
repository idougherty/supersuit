var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var p = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.vx = 5 * Math.random() - 2.5;
        this.vy = 5 * Math.random() - 2.5;
        this.size = 5;
        this.color =
            "rgba(" + (Math.floor(Math.random() * 100) + 155) + ", 50, 30, 1)";
    }

    run() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.size, this.size);

        this.vx *= 0.98;
        this.vx *= 0.98;

        this.size -= 0.1;
        this.x += this.vx;
        this.y += this.vy;
    }
}

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.vx = 0;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.keydown = {
            LEFT: false,
            RIGHT: false,
            UP: false,
            DOWN: false
        };
    }

    draw() {
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.keydown.LEFT && !this.keydown.RIGHT) {
            this.left();
        } else if (this.keydown.RIGHT && !this.keydown.LEFT) {
            this.right();
        } else {
            this.vx *= 0.7;
        }

        if (this.keydown.UP && !this.keydown.DOWN) {
            this.up();
        } else if (this.keydown.DOWN && !this.keydown.UP) {
            this.down();
        } else {
            this.vy *= 0.7;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    left() {
        if (this.vx > -4) {
            this.vx -= 1;
        } else {
            this.vx = -4;
        }
    }

    right() {
        if (this.vx < 4) {
            this.vx += 1;
        } else {
            this.vx = 4;
        }
    }

    up() {
        if (this.vy > -4) {
            this.vy -= 1;
        } else {
            this.vy = -4;
        }
    }

    down() {
        if (this.vy < 4) {
            this.vy += 1;
        } else {
            this.vy = 4;
        }
    }
}

document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 37: //left
            player.keydown.LEFT = true;
            break;

        case 38: //up
            player.keydown.UP = true;
            break;

        case 39: //right
            player.keydown.RIGHT = true;
            break;

        case 40: //down
            player.keydown.DOWN = true;
            break;

        default:
            return;
    }
    game.update();
});

document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
        case 37: //left
            player.keydown.LEFT = false;
            break;

        case 38: //up
            player.keydown.UP = false;
            break;

        case 39: //right
            player.keydown.RIGHT = false;
            break;

        case 40: //down
            player.keydown.DOWN = false;
            break;

        default:
    }
});

class Gamestate {
    constructor() {
        this.speed = 1;
    }
    update() {
        this.speed =
            120 /
            (Math.sqrt(player.vx * player.vx + player.vy * player.vy) + 1);
        console.log(game.speed);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        player.update();
        player.draw();
    }
    loop() {
        game.update();
        setTimeout(game.loop, game.speed);
    }
}

game = new Gamestate();
player = new Player();

game.loop();
