/**
 * Map
 * @type {Object}
 */
var map = {
    bgColor: '#183030'
};

map.drawBg = function() {
    game.ctx.fillStyle = this.bgColor;
    game.ctx.fillRect(0, 0, viewport.width, viewport.height);

    var bgSpeed = 1;
    var w = viewport.width;
    var h = viewport.height;
    var ox = - viewport.x * bgSpeed;
    var oy = - viewport.y * bgSpeed;
    if (!this.bgPattern) {
        this.bgPattern = game.ctx.createPattern(game.loadedImages['bg.png'], 'repeat');
    }
    game.ctx.fillStyle = this.bgPattern;
    game.ctx.translate(ox, oy);
    game.ctx.fillRect(-ox, -oy, w, h);
    game.ctx.translate(-ox, -oy);
};

map.draw = function() {
    this.drawBg();
    var vx = ship.velocity.x;
    var vy = ship.velocity.y;
    var vabs = Math.pow(Math.pow(vx, 2) + Math.pow(vy, 2), 0.5);
    var texts = [
        ['score: ' + game.score + '/' + game.maxScore],
        ['seconds left: ' + game.leftToPlay]
    ];
    game.ctx.textAlign = 'left';
    game.ctx.fillStyle = 'rgba(224, 240, 232, 0.6)';
    game.ctx.font="20px monospace";
    for (var i = 0; i < texts.length; i++) {
        game.ctx.fillText(texts[i].join(', '), 10, 30 + i * 20);
    }

};

map.drawImage = function(img, x, y, w, h) {
    if (!(img in game.cachedImages)) {
        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        c.getContext('2d').drawImage(game.loadedImages[img], 0, 0, w, h);
        game.cachedImages[img] = c;
    }
    game.ctx.drawImage(game.cachedImages[img], x, y, w, h);
};