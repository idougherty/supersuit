// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIf = removeIf;
exports.removeIfEq = removeIfEq;
exports.entityCenter = exports.isCollidingRectEntities = exports.isCollidingRect = exports.isCollidingCircleEntities = exports.isCollidingCircle = void 0;

function removeIf(arr, callback) {
  var i = 0;

  while (i < arr.length) {
    if (callback(arr[i], i)) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
}

function removeIfEq(arr, elem, cb) {
  removeIf(arr, a => {
    const remove = a === elem;
    if (remove && cb) cb();
    return remove;
  });
}

const isCollidingCircle = (x1, y1, r1, x2, y2, r2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) <= r1 + r2;

exports.isCollidingCircle = isCollidingCircle;

const isCollidingCircleEntities = (a, b) => isCollidingCircle(a.x + a.width / 2, a.y + a.height / 2, a.radius, b.x + b.width / 2, b.y + b.height / 2, b.radius);

exports.isCollidingCircleEntities = isCollidingCircleEntities;

const isCollidingRect = (x1, y1, w1, h1, x2, y2, w2, h2) => x1 + w1 > x2 && y1 + h1 > y2 && x1 < x2 + w2 && y1 < y2 + h2;

exports.isCollidingRect = isCollidingRect;

const isCollidingRectEntities = (a, b) => isCollidingRect(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height);

exports.isCollidingRectEntities = isCollidingRectEntities;

const entityCenter = entity => [entity.x + entity.width / 2, entity.y + entity.height / 2];

exports.entityCenter = entityCenter;
},{}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TILE_SIZE = void 0;
const TILE_SIZE = 42;
exports.TILE_SIZE = TILE_SIZE;
},{}],"img.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImageNow = loadImageNow;
exports.loadImage = loadImage;
exports.images = void 0;
const images = [];
exports.images = images;

const imageProm = img => new Promise((resolve, reject) => {
  img.addEventListener("load", () => resolve(img));
  img.addEventListener("error", () => reject());
});

function loadImageNow(src) {
  const img = new Image();
  img.src = src;
  return imageProm(img);
}

function loadImage(src) {
  const img = new Image();
  img.src = "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // once everything on the page is loaded and ready we can start loading assets

  window.addEventListener("load", () => {
    img.src = src;
    images.push(imageProm(img));
  });
  return img;
}
},{}],"art/trapdooropen.png":[function(require,module,exports) {
module.exports = "/trapdooropen.dd14b2fb.png";
},{}],"art/trapdoorclosed.png":[function(require,module,exports) {
module.exports = "/trapdoorclosed.5d8c2a7a.png";
},{}],"trapdoor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trapdoor = void 0;

var _constants = require("./constants.js");

var _img = require("./img.js");

const openTexture = (0, _img.loadImage)(require("./art/trapdooropen.png"));
const closedTexture = (0, _img.loadImage)(require("./art/trapdoorclosed.png"));

class Trapdoor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = _constants.TILE_SIZE;
    this.width = _constants.TILE_SIZE;
    this.open = false;
  }

  draw(c) {
    if (this.open) {
      c.drawImage(openTexture, this.x, this.y, this.height, this.width);
    } else {
      c.drawImage(closedTexture, this.x, this.y, this.height, this.width);
    }
  }

}

exports.Trapdoor = Trapdoor;
},{"./constants.js":"constants.js","./img.js":"img.js","./art/trapdooropen.png":"art/trapdooropen.png","./art/trapdoorclosed.png":"art/trapdoorclosed.png"}],"bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var _util = require("./util.js");

var _trapdoor = require("./trapdoor.js");

class Bullet {
  constructor(x, y, vector, tag) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.width = 4;
    this.height = 4;
    this.vector = vector;
    this.speed = 10;
    this.tag = tag;
  }

  update(game) {
    this.x += this.vector[0] * this.speed;
    this.y += this.vector[1] * this.speed;

    for (const obstacle of game.obstacles) {
      if (!(obstacle instanceof _trapdoor.Trapdoor) && (0, _util.isCollidingRectEntities)(this, obstacle)) {
        (0, _util.removeIfEq)(game.bullets, this);
        return;
      }
    }

    if (this.tag == "enemy") {
      if ((0, _util.isCollidingCircleEntities)(this, game.player)) {
        game.player.respawn();
      }
    }

    if (this.tag == "player") {
      (0, _util.removeIf)(game.enemies, enemy => {
        const isColliding = (0, _util.isCollidingCircleEntities)(this, enemy);

        if (isColliding) {
          enemy.kill(game);
          (0, _util.removeIfEq)(game.bullets, this);
        }

        return isColliding;
      });
    }
  }

  draw(c) {
    c.fillStyle = "grey";
    c.fillRect(this.x, this.y, this.width, this.height);
  }

}

exports.Bullet = Bullet;
},{"./util.js":"util.js","./trapdoor.js":"trapdoor.js"}],"art/itsthegun.png":[function(require,module,exports) {
module.exports = "/itsthegun.309385cd.png";
},{}],"weapon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weapon = void 0;

var _img = require("./img.js");

const gunTexture = (0, _img.loadImage)(require("./art/itsthegun.png"));

class Weapon {
  constructor(x, y, loaded, weapon = "gun") {
    this.x = x;
    this.y = y;
    this.loaded = loaded;
    this.height = 4;
    this.width = 16;
    this.radius = 8;
    this.texture = gunTexture;
    this.weapon = weapon;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);

    if (this.loaded) {
      c.fillStyle = "rgba(0, 0, 0, .5)";
      c.fillRect(this.x - 6, this.y - 6, 12, 12);
    }
  }

}

exports.Weapon = Weapon;
},{"./img.js":"img.js","./art/itsthegun.png":"art/itsthegun.png"}],"particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var _util = require("./util.js");

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 2.5;
    this.vx = 0;
    this.size = 5;
    this.color = "rgba(" + (Math.floor(Math.random() * 100) + 155) + ", 50, 30, 1)";
  }

  draw(c) {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
  }

  update(game) {
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() + 2;
    this.size -= Math.random() / 5;

    if (this.size <= 0) {
      (0, _util.removeIfEq)(game.particles, this);
      return;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

}

exports.Particle = Particle;
},{"./util.js":"util.js"}],"art/crackhead.png":[function(require,module,exports) {
module.exports = "/crackhead.da277cac.png";
},{}],"art/gunguy.png":[function(require,module,exports) {
module.exports = "/gunguy.69510a29.png";
},{}],"enemies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuyThatShootsYou = exports.Crachead = exports.Enemy = void 0;

var _bullet = require("./bullet.js");

var _trapdoor = require("./trapdoor.js");

var _util = require("./util.js");

var _weapon = require("./weapon.js");

var _particle = require("./particle.js");

var _img = require("./img.js");

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.texture = null;
  }

  update(_game) {}

  kill(game) {
    const [centerX, centerY] = (0, _util.entityCenter)(this);

    const particle = () => {
      game.particles.push(new _particle.Particle(centerX + (Math.random() - 1) * this.width, centerY + (Math.random() - 1) * this.height));
    };

    particle();
    particle();
    particle();
    particle();
    particle();
    particle();
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height); //c.fillStyle = "brown";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }

  calculateCollisions() {
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }

    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }

    if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.vx = 0;
    }
  }

}

exports.Enemy = Enemy;
const cracheadTexture = (0, _img.loadImage)(require("./art/crackhead.png"));

class Crachead extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = cracheadTexture;
  }

  update(game) {
    var dist = Math.sqrt((game.player.x - this.x) ** 2 + (game.player.y - this.y) ** 2);
    var direction_vector = [(game.player.x - this.x) / dist, (game.player.y - this.y) / dist];
    this.x += direction_vector[0] * 4;

    for (const obs of game.obstacles) {
      if (!(obs instanceof _trapdoor.Trapdoor) && (0, _util.isCollidingRectEntities)(this, obs)) {
        this.x -= direction_vector[0] * 4;
        this.vx = 0;
      }
    }

    this.y += direction_vector[1] * 4;

    for (const obs of game.obstacles) {
      if (!(obs instanceof _trapdoor.Trapdoor) && (0, _util.isCollidingRectEntities)(this, obs)) {
        this.y -= direction_vector[1] * 4;
        this.vy = 0;
      }
    }

    if ((0, _util.isCollidingCircleEntities)(this, game.player)) {
      game.player.respawn();
    }
  }

}

exports.Crachead = Crachead;
const gunguyTexture = (0, _img.loadImage)(require("./art/gunguy.png"));

class GuyThatShootsYou extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.texture = gunguyTexture;
    this.reload = 10;
  }

  kill(game) {
    const [centerX, centerY] = (0, _util.entityCenter)(this);
    game.weapons.push(new _weapon.Weapon(centerX - this.width / 4, centerY - this.height / 4, true));
    super.kill(game);
  }

  update(game) {
    this.reload -= 1;
    var dist = Math.sqrt((game.player.x - this.x) ** 2 + (game.player.y - this.y) ** 2);
    var direction_vector = [(game.player.x - this.x) / dist, (game.player.y - this.y) / dist];

    if (this.reload <= 0) {
      game.bullets.push(new _bullet.Bullet(this.x + this.width / 2, this.y + this.height / 2, direction_vector, "enemy"));
      this.reload = 25;
    }
  }

}

exports.GuyThatShootsYou = GuyThatShootsYou;
},{"./bullet.js":"bullet.js","./trapdoor.js":"trapdoor.js","./util.js":"util.js","./weapon.js":"weapon.js","./particle.js":"particle.js","./img.js":"img.js","./art/crackhead.png":"art/crackhead.png","./art/gunguy.png":"art/gunguy.png"}],"art/crate.png":[function(require,module,exports) {
module.exports = "/crate.64566789.png";
},{}],"crate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crate = void 0;

var _constants = require("./constants.js");

var _img = require("./img.js");

const crateTexture = (0, _img.loadImage)(require("./art/crate.png"));

class Crate {
  constructor(x, y) {
    this.width = 3 * _constants.TILE_SIZE;
    this.height = 3 * _constants.TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = crateTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }

}

exports.Crate = Crate;
},{"./constants.js":"constants.js","./img.js":"img.js","./art/crate.png":"art/crate.png"}],"art/wall.png":[function(require,module,exports) {
module.exports = "/wall.85e0bd26.png";
},{}],"wall.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wall = void 0;

var _constants = require("./constants.js");

var _img = require("./img.js");

const wallTexture = (0, _img.loadImage)(require("./art/wall.png"));

class Wall {
  constructor(x, y) {
    this.width = _constants.TILE_SIZE;
    this.height = 3 * _constants.TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = wallTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height); //c.fillStyle = "#999";
    ///c.fillRect(this.x, this.y, this.width, this.height);
  }

}

exports.Wall = Wall;
},{"./constants.js":"constants.js","./img.js":"img.js","./art/wall.png":"art/wall.png"}],"art/barrel.png":[function(require,module,exports) {
module.exports = "/barrel.770990c0.png";
},{}],"firebarrel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireBarrel = void 0;

var _constants = require("./constants.js");

var _img = require("./img.js");

const barrelTexture = (0, _img.loadImage)(require("./art/barrel.png"));

class FireBarrel {
  constructor(x, y) {
    this.width = _constants.TILE_SIZE;
    this.height = _constants.TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = barrelTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height); //c.fillStyle = "orange";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }

}

exports.FireBarrel = FireBarrel;
},{"./constants.js":"constants.js","./img.js":"img.js","./art/barrel.png":"art/barrel.png"}],"art/bookshelf.png":[function(require,module,exports) {
module.exports = "/bookshelf.b0e20f16.png";
},{}],"bookshelf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bookshelf = void 0;

var _constants = require("./constants.js");

var _img = require("./img.js");

const bookshelfTexture = (0, _img.loadImage)(require("./art/bookshelf.png"));

class Bookshelf {
  constructor(x, y) {
    this.width = 4 * _constants.TILE_SIZE;
    this.height = _constants.TILE_SIZE;
    this.x = x;
    this.y = y;
    this.texture = bookshelfTexture;
  }

  draw(c) {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height); //c.fillStyle = "brown";
    //c.fillRect(this.x, this.y, this.width, this.height);
  }

}

exports.Bookshelf = Bookshelf;
},{"./constants.js":"constants.js","./img.js":"img.js","./art/bookshelf.png":"art/bookshelf.png"}],"art/frozoefront.png":[function(require,module,exports) {
module.exports = "/frozoefront.683336a8.png";
},{}],"art/frozonefronttwalk.gif":[function(require,module,exports) {
module.exports = "/frozonefronttwalk.4461a2a5.gif";
},{}],"art/frozoneback.png":[function(require,module,exports) {
module.exports = "/frozoneback.65b1a5d6.png";
},{}],"art/frorightwalk.gif":[function(require,module,exports) {
module.exports = "/frorightwalk.ff652cbe.gif";
},{}],"art/froleftwalk.gif":[function(require,module,exports) {
module.exports = "/froleftwalk.7edbf02e.gif";
},{}],"art/itsafist.png":[function(require,module,exports) {
module.exports = "/itsafist.e1371870.png";
},{}],"art/endscreen.jpg":[function(require,module,exports) {
module.exports = "/endscreen.3a97c822.jpg";
},{}],"art/title.jpg":[function(require,module,exports) {
module.exports = "/title.287e85c2.jpg";
},{}],"art/explain.jpg":[function(require,module,exports) {
module.exports = "/explain.a429db63.jpg";
},{}],"script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateVector = calculateVector;

var _enemies = require("./enemies.js");

var _crate = require("./crate.js");

var _wall = require("./wall.js");

var _firebarrel = require("./firebarrel.js");

var _bookshelf = require("./bookshelf.js");

var _util = require("./util.js");

var _weapon = require("./weapon.js");

var _bullet = require("./bullet.js");

var _constants = require("./constants.js");

var _trapdoor = require("./trapdoor.js");

var _img = require("./img.js");

var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */

var c = canvas.getContext("2d");
c.imageSmoothingEnabled = false;
let win = false;
const PUNCH_COOL_DOWN = 50;
const playerFront = (0, _img.loadImage)(require("./art/frozoefront.png"));
const playerFrontWalking = (0, _img.loadImage)(require("./art/frozonefronttwalk.gif"));
const playerBack = (0, _img.loadImage)(require("./art/frozoneback.png"));
const playerRightWalking = (0, _img.loadImage)(require("./art/frorightwalk.gif"));
const playerLeftWalking = (0, _img.loadImage)(require("./art/froleftwalk.gif"));

class Player {
  constructor() {
    this.x = canvas.width / 3;
    this.y = canvas.height / 3;
    this.vx = 0;
    this.vy = 0;
    this.width = 32;
    this.height = 32;
    this.radius = 16;
    this.weapon = "fist";
    this.maxSpeed = 4;
    this.punchCoolDown = PUNCH_COOL_DOWN;
    this.texture = playerFront;
    this.keydown = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: false
    };
  }

  draw() {
    c.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }

  respawn() {
    game.enemies = [];
    game.weapons = [];
    game.bullets = [];
    game.particles = [];
    game.newObstacles(game.levels[game.currentLevel]);
    this.x = game.entranceX;
    this.y = game.entranceY;
    this.vx = 0;
    this.vy = 0;
  }

  calculateCollisions() {
    if (this.weapon != "gun") {
      (0, _util.removeIf)(game.weapons, weapon => {
        const shouldPickUp = weapon.loaded && (0, _util.isCollidingCircleEntities)(this, weapon);

        if (shouldPickUp) {
          this.weapon = weapon.weapon;
        }

        return shouldPickUp;
      });
    }

    for (const obs of game.obstacles) {
      if (obs instanceof _trapdoor.Trapdoor) {
        if (game.enemies.length === 0) {
          obs.open = true;
        }

        if (obs.open && (0, _util.isCollidingRectEntities)(this, obs)) {
          game.currentLevel++;

          if (game.currentLevel > game.levels.length - 1) {
            win = true;
            return;
          }

          game.newObstacles(game.levels[game.currentLevel]);
          this.respawn();
          return;
        }
      }
    }

    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    } else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.vx = 0;
    }
  }

  update() {
    this.punchCoolDown++;

    if (this.keydown.LEFT && !this.keydown.RIGHT) {
      this.left();
    } else if (this.keydown.RIGHT && !this.keydown.LEFT) {
      this.right();
    } else {
      this.vx *= 0.7;
    }

    if ((this.keydown.RIGHT || this.keydown.LEFT) && (this.keydown.UP || this.keydown.DOWN)) {
      this.maxSpeed = 2.828;
    } else {
      this.maxSpeed = 4;
    }

    if (this.keydown.UP && !this.keydown.DOWN) {
      this.up();
    } else if (this.keydown.DOWN && !this.keydown.UP) {
      this.down();
    } else {
      this.vy *= 0.7;
    }

    this.x += this.vx;

    for (const obs of game.obstacles) {
      if (!(obs instanceof _trapdoor.Trapdoor) && (0, _util.isCollidingRectEntities)(this, obs)) {
        this.x -= this.vx;
        this.vx = 0;
      }
    }

    this.y += this.vy;

    for (const obs of game.obstacles) {
      if (!(obs instanceof _trapdoor.Trapdoor) && (0, _util.isCollidingRectEntities)(this, obs)) {
        this.y -= this.vy;
        this.vy = 0;
      }
    }

    this.calculateCollisions();
    calculateCursorCoords();
  }

  left() {
    if (this.vx > -this.maxSpeed) {
      this.vx -= 1;
    } else {
      this.vx = -this.maxSpeed;
    }

    this.texture = playerLeftWalking;
  }

  right() {
    if (this.vx < this.maxSpeed) {
      this.vx += 1;
    } else {
      this.vx = this.maxSpeed;
    }

    this.texture = playerRightWalking;
  }

  up() {
    if (this.vy > -this.maxSpeed) {
      this.vy -= 1;
    } else {
      this.vy = -this.maxSpeed;
    }

    this.texture = playerBack;
  }

  down() {
    if (this.vy < this.maxSpeed) {
      this.vy += 1;
    } else {
      this.vy = this.maxSpeed;
    }

    this.texture = playerFrontWalking;
  }

  punch() {
    (0, _util.removeIf)(game.enemies, enemy => {
      const isColliding = (0, _util.isCollidingCircle)(cursorX, cursorY, 32, enemy.x, enemy.y, enemy.radius);
      if (isColliding) enemy.kill(game);
      return isColliding;
    });
  }

  shoot(vector) {
    const [centerX, centerY] = (0, _util.entityCenter)(this);
    game.bullets.push(new _bullet.Bullet(centerX, centerY, vector, "player"));
    this.weapon = "fist";
    game.weapons.push(new _weapon.Weapon(centerX - this.width / 4, centerY - this.height / 4, false));
  }

}

function calculateVector(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const ratio = 1 / Math.sqrt(xDist ** 2 + yDist ** 2);
  return [xDist * ratio, yDist * ratio];
}

canvas.addEventListener("click", function (e) {
  if (game.player.weapon === "fist") {
    if (game.player.punchCoolDown > PUNCH_COOL_DOWN) {
      game.player.punch();
      game.player.punchCoolDown = 0;
    }
  } else {
    const [playerX, playerY] = (0, _util.entityCenter)(game.player);
    const vector = calculateVector(playerX, playerY, e.offsetX, e.offsetY);
    game.player.shoot(vector);
  }
});
document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      game.player.keydown.LEFT = true;
      break;

    case "KeyW":
    case "ArrowUp":
      game.player.keydown.UP = true;
      break;

    case "KeyD":
    case "ArrowRight":
      game.player.keydown.RIGHT = true;
      break;

    case "KeyS":
    case "ArrowDown":
      game.player.keydown.DOWN = true;
      break;

    default:
      return;
  }
});
document.addEventListener("keyup", function (e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      game.player.keydown.LEFT = false;
      break;

    case "KeyW":
    case "ArrowUp":
      game.player.keydown.UP = false;
      break;

    case "KeyD":
    case "ArrowRight":
      game.player.keydown.RIGHT = false;
      break;

    case "KeyS":
    case "ArrowDown":
      game.player.keydown.DOWN = false;
      break;

    default:
  }
});
let cursorX = 0;
let cursorY = 0;

function calculateCursorCoords() {
  if (game.player.weapon === "fist") {
    const [playerX, playerY] = (0, _util.entityCenter)(game.player);
    const xDist = mouseX - playerX;
    const yDist = mouseY - playerY;
    const distance = Math.sqrt(xDist ** 2 + yDist ** 2);

    if (distance > 64) {
      const ratio = 64 / distance;
      cursorX = playerX + xDist * ratio;
      cursorY = playerY + yDist * ratio;
      return;
    }
  }

  cursorX = mouseX;
  cursorY = mouseY;
}

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", event => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
  calculateCursorCoords();
});
const fist = (0, _img.loadImage)(require("./art/itsafist.png"));
const gun = (0, _img.loadImage)(require("./art/itsthegun.png"));
/** @param {CanvasRenderingContext2D} c */

function drawCursor(c) {
  if (game.player.weapon === "fist") {
    c.drawImage(fist, cursorX - 6, cursorY - 6, 12, 12);

    if (game.player.punchCoolDown < PUNCH_COOL_DOWN) {
      c.fillStyle = "rgba(0, 0, 0, .5)";
      c.fillRect(cursorX - 6, cursorY - 6, 12, 12);
    }
  } else {
    c.drawImage(gun, cursorX - 8, cursorY - 2, 16, 4);
  }
}

const endscreenImage = (0, _img.loadImage)(require("./art/endscreen.jpg"));

function draw() {
  if (win) {
    c.drawImage(endscreenImage, 0, 0, canvas.width, canvas.height);
    return;
  }

  game.player.update();
  const prespeed = Math.sqrt(game.player.vx * game.player.vx + game.player.vy * game.player.vy) + 0.5;
  game.speed = 120 / prespeed;
  c.fillStyle = `rgba(0, 0, 0, ${1 / game.speed * 15})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (const entity of [...game.obstacles, ...game.weapons, ...game.enemies, ...game.bullets, ...game.particles]) {
    entity.draw(c);
  }

  game.player.draw(c);

  if (game.player.weapon === "fist") {
    c.beginPath();
    c.fillStyle = "darkred";
    c.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    c.fill();
  }

  drawCursor(c);
  requestAnimationFrame(draw);
}

class Gamestate {
  constructor() {
    this.player = new Player();
    this.speed = 1;
    this.currentLevel = 0;
    this.enemies = [];
    this.obstacles = [];
    this.weapons = [];
    this.bullets = [];
    this.particles = [];
    this.levels = [];
    this.entranceX = 0;
    this.entranceY = 0;
  }

  newObstacles(layout) {
    this.obstacles = [];
    layout.forEach((row, y) => {
      row.forEach(([type, entity], x) => {
        switch (type) {
          case "noop":
            break;

          case "entrance":
            this.entranceX = x * _constants.TILE_SIZE;
            this.entranceY = y * _constants.TILE_SIZE;
            break;

          case "enemy":
            this.enemies.push(new entity(x * _constants.TILE_SIZE, y * _constants.TILE_SIZE));
            break;

          case "obstacle":
            this.obstacles.push(new entity(x * _constants.TILE_SIZE, y * _constants.TILE_SIZE));
            break;

          default:
            console.error("unknown map entity type:", type);
        }
      });
    });
  }

  update() {
    for (const entity of [...this.enemies, ...this.bullets, ...this.particles]) {
      if (entity.update) entity.update(game);
    }
  }

  loop() {
    if (win) return;
    game.update();
    setTimeout(game.loop, game.speed);
  }

}

const game = new Gamestate();
window.game = game;
game.weapons.push(new _weapon.Weapon(64, 64, true));
{
  // new scope so we don't accidentally use these one-off variables
  const _ = ["noop"];
  const e = ["entrance"];
  const c = ["obstacle", _crate.Crate];
  const b = ["obstacle", _bookshelf.Bookshelf];
  const f = ["obstacle", _firebarrel.FireBarrel];
  const w = ["obstacle", _wall.Wall];
  const t = ["obstacle", _trapdoor.Trapdoor];
  const h = ["enemy", _enemies.Crachead];
  const g = ["enemy", _enemies.GuyThatShootsYou];
  game.levels.push([[h, _, _, _, w, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, e, _, _, _, _, _, _, _], [c, _, _, _, _, _, f, _, _, _, t, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, b, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]], [[_, _, _, _, w, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, g, _, _], [_, _, f, _, _, _, _, _, _, _, _, _], [_, _, _, _, w, _, c, _, _, _, _, _], [e, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, t], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, w, _, h, g, _, f, _, _], [_, _, h, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]], [[_, _, _, _, _, _, _, _, _, _, _, _], [_, g, _, _, _, _, _, _, _, _, g, _], [_, _, c, _, _, _, _, c, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [t, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, h, h, _, _, _, _, _], [_, _, _, _, _, h, h, _, _, _, _, _], [_, _, c, _, _, _, _, c, _, _, _, e], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, g, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]], [[_, _, _, _, f, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, g, _, _], [_, _, _, w, b, _, _, _, _, _, _, _], [_, _, h, _, _, _, _, _, _, _, _, _], [e, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, w, _, _, _, h, _, _, g, _], [_, _, h, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, f, _, t], [_, _, _, _, _, _, _, _, _, _, _, _], [_, f, _, _, _, _, _, g, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]], [[_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, h, h, h, h, h, h, _, _, _], [t, _, _, h, _, _, _, _, h, _, _, _], [_, _, _, h, _, f, f, _, h, _, _, _], [_, _, _, h, _, f, f, _, h, _, _, _], [_, _, _, h, _, _, _, _, h, _, _, e], [_, _, _, h, h, h, h, h, h, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]], [[c, _, _, c, _, _, c, _, _, c, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [b, _, _, _, b, _, _, _, b, _, _, _], [e, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, h, h, h, h, h, _, g, _], [_, _, _, _, h, h, h, h, h, g, _, _], [_, _, _, _, _, _, _, _, _, _, _, t], [b, _, _, _, b, _, _, _, b, _, _, _], [c, _, _, c, _, _, c, _, _, c, _, _], [_, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _]]);
}
const titleImage = (0, _img.loadImageNow)(require("./art/title.jpg"));
const explainImage = (0, _img.loadImageNow)(require("./art/explain.jpg"));
titleImage.then(titleImgLoaded => {
  let startImage = "title";
  c.drawImage(titleImgLoaded, 0, 0, canvas.width, canvas.height);
  canvas.addEventListener("click", async function listener() {
    switch (startImage) {
      case "title":
        startImage = "explain";
        const explainImgLoaded = await explainImage;
        c.drawImage(explainImgLoaded, 0, 0, canvas.width, canvas.height);
        break;

      case "explain":
        canvas.removeEventListener("click", listener);
        await startGame();
        break;
    }
  });
});

async function startGame() {
  await Promise.all(_img.images);
  requestAnimationFrame(draw);
  game.loop();
  game.player.respawn();
}
},{"./enemies.js":"enemies.js","./crate.js":"crate.js","./wall.js":"wall.js","./firebarrel.js":"firebarrel.js","./bookshelf.js":"bookshelf.js","./util.js":"util.js","./weapon.js":"weapon.js","./bullet.js":"bullet.js","./constants.js":"constants.js","./trapdoor.js":"trapdoor.js","./img.js":"img.js","./art/frozoefront.png":"art/frozoefront.png","./art/frozonefronttwalk.gif":"art/frozonefronttwalk.gif","./art/frozoneback.png":"art/frozoneback.png","./art/frorightwalk.gif":"art/frorightwalk.gif","./art/froleftwalk.gif":"art/froleftwalk.gif","./art/itsafist.png":"art/itsafist.png","./art/itsthegun.png":"art/itsthegun.png","./art/endscreen.jpg":"art/endscreen.jpg","./art/title.jpg":"art/title.jpg","./art/explain.jpg":"art/explain.jpg"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40151" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map