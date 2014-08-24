var Planet = function(sun, distance, alpha, speed, mass) {
    this.sun = sun;
    this.distance = distance;
    this.alpha = alpha;
    this.speed = speed;
    this.size = 16;
    this.scoreGap = this.size * 8;
    this.mass = mass;
    this.numberOfRounds = 0;
    this.lastShipAlpha = null;

    this.leftToCircle = Math.random() * 20 | 0;

    this.sprite = 'planet.png';
    this.fullSprite = 'planet_done.png';
};

Planet.EPSILON = 2;

Planet.prototype.getPos = function() {
    return p(this.sun.x + this.distance * Math.cos(this.alpha), this.sun.y + this.distance * Math.sin(this.alpha));
};

Planet.prototype.draw = function() {
    var s = this.size / 2 | 0;
    var p = this.getPos();
    var d = this.scoreGap;
    if (p.x < viewport.x - d || p.x > viewport.x + viewport.width + d || p.y < viewport.y -d || p.y > viewport.y + viewport.height + d) {
        return;
    }

    game.ctx.beginPath();
    game.ctx.fillStyle = 'rgba(224, 240, 232, 0.1)';
    game.ctx.arc(p.x - viewport.x, p.y - viewport.y,  this.scoreGap, 0, 2 * Math.PI, false);
    game.ctx.fill();

    map.drawImage(this.leftToCircle > 0 ? this.sprite : this.fullSprite, p.x - s - viewport.x, p.y - s - viewport.y, 2 * s, 2 * s);

    game.ctx.fillStyle = 'rgba(224, 240, 232, 0.6)';
    game.ctx.font = '20px monospace';
    game.ctx.fillText('mass: ' + this.mass, p.x - viewport.x, p.y - 20 - viewport.y);

    if (this.leftToCircle > 0) {
        game.ctx.fillStyle = 'rgba(224, 240, 232, 0.6)';
        game.ctx.font = '20px monospace';
        game.ctx.fillText('units:' + this.leftToCircle, p.x - viewport.x, p.y - viewport.y);
    }
};

Planet.prototype.update = function() {
    this.alpha += this.speed;
    this.checkShip();
};

Planet.prototype.getForceOn = function(pos, mass) {
    var ppos = this.getPos();
    var dx = ppos.x - pos.x;
    var dy = ppos.y - pos.y;
    var distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);

    if (distance < this.size) {
        game.over();
        return p(0, 0);
    } else if (distance > this.scoreGap) {
        return p(0, 0);
    }

    var abs = 3e0 / Math.pow(distance, 1e-5);
    var alpha = atan(dx, dy);
    return p(
        abs * Math.cos(alpha),
        abs * Math.sin(alpha)
    );
};

Planet.prototype.checkShip = function() {
    var ppos = this.getPos();
    var dx = ship.pos.x - ppos.x;
    var dy = ship.pos.y - ppos.y;
    if (Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(this.scoreGap, 2)) {
        if (this.startAlpha === null) {
            this.startAlpha = atan(dx, dy);
            this.numberOfRounds = 0;
        } else {
            var a = atan(dx, dy);
            if (this.lastShipAlpha * a < 0 && (this.numberOfRounds += 0.5) % 1 === 0 && --this.leftToCircle >= 0) {
                var i = (Math.random() * 4 | 0) + 1;
                game.audio.playSound('orbit' + i + '.wav');
                game.score++;
                game.leftToPlay+=5;
            }
            this.lastShipAlpha = a;
        }
    } else {
        this.startAlpha = null;
    }
};