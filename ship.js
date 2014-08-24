/**
 * Game hero
 * @type {Object}
 */
var ship = {
    sprite: 'ship.png',
    width: 32,
    height: 32,
    acceleration: 2,
    epsilon: 1e-8,
    mass: 1,
    maxVelocity: 20
};

ship.init = function() {
    ship.pos = p(0, 0);
    ship.rotation = 0; //- Math.PI / 2;
    ship.velocity = p(0, 0);
    ship.velocity.x += 0.0 * ship.acceleration;
    ship.forces = p(0, 0);
    ship.tail = [];
};


ship.update = function() {
    if (Math.abs(this.velocity.x) < this.epsilon) {
        this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.y) < this.epsilon) {
        this.velocity.y = 0;
    }

    this.forces = p(0, 0);
    for (var i = 0; i < game.planets.length; i++) {
        var f = game.planets[i].getForceOn(this.pos, this.mass);
        this.forces.x += f.x;
        this.forces.y += f.y;
    }

    this.velocity.x += this.forces.x;
    this.velocity.y += this.forces.y;

    if (Math.abs(this.velocity.x) > this.maxVelocity) {
        this.velocity.x = (this.velocity.x > 0 ? 1 : -1) * this.maxVelocity;
    }

    if (Math.abs(this.velocity.y) > this.maxVelocity) {
        this.velocity.y = (this.velocity.y > 0 ? 1 : -1) * this.maxVelocity;
    }

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    if (this.forces.x !== 0 || this.forces.y !== 0) {
        ship.rotation = atan(ship.velocity.x, ship.velocity.y);
    }

    this.tail.push(p(this.pos.x, this.pos.y));
    this.tail.splice(0, Math.max(0, this.tail.length - 40));
};

ship.draw = function() {
    var w = this.width / 2 | 0;
    var h = this.height / 2 | 0;
    game.ctx.save();
    game.ctx.translate(this.pos.x - viewport.x, this.pos.y - viewport.y);
    game.ctx.rotate(Math.PI / 2 + this.rotation);
    map.drawImage(this.sprite, -w, -h, 2 * w, 2 * h);
    game.ctx.restore();

    var barsScale = 10;


    game.ctx.beginPath();
    game.ctx.lineWidth = 1;
    game.ctx.moveTo(this.tail[0].x - viewport.x, this.tail[0].y - viewport.y);
    game.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    var opacity, k;
    for (var i = 1; i < this.tail.length; i++) {
        game.ctx.lineTo(this.tail[i].x + - viewport.x, this.tail[i].y - viewport.y);
        for (k = 0; k < 30; k++) {
            if (i < this.tail.length * (k + 1) * 0.1 && i < this.tail.length - 1) {
                game.ctx.stroke();
                game.ctx.beginPath();
                game.ctx.strokeStyle = 'rgba(174, 196, 64, ' + (0.1 * k) + ')';
                game.ctx.moveTo(this.tail[i].x + - viewport.x, this.tail[i].y - viewport.y);
                break;
            }
        }
    }
    game.ctx.stroke();
};
