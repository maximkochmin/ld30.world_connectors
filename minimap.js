var minimap = {
    bottomLeftY: 0,
    width: 300,
    height: 200,
    bgColor: 'rgba(215, 232, 148, 0.5)',
    gridColor: 'rgba(24, 48, 48, 0.5)',
    color: 'rgba(82, 127, 57, 0.8)',
    fullColor: 'rgba(0, 0, 0, 0)',
    scale: 0.05
};

minimap.draw = function() {
    game.ctx.fillStyle = this.bgColor;
    game.ctx.fillRect(
        0,
        viewport.height - this.height,
        this.width,
        this.height
    );

    var c = p(this.width / 2 | 0, viewport.height - this.height / 2 | 0);

    game.ctx.beginPath();
    game.ctx.strokeStyle = this.gridColor;
    game.ctx.lineWidth = 1;
    game.ctx.moveTo(c.x - this.width / 5, c.y);
    game.ctx.lineTo(c.x + this.width / 5, c.y);
    game.ctx.moveTo(c.x, c.y - this.height / 5);
    game.ctx.lineTo(c.x, c.y + this.height / 5);
    game.ctx.stroke();

    game.ctx.font = '10px monospace';
    game.ctx.lineWidth = 1;
    game.ctx.textBaseline = 'middle';
    game.ctx.textAlign = 'center';

    var ppos, lx, ly;
    var py = 5;
    var pw = 20;
    for (var i = 0; i < game.planets.length; i++) {
        ppos = game.planets[i].getPos();
        lx = c.x + (ppos.x - ship.pos.x) * this.scale;
        ly = c.y + (ppos.y - ship.pos.y) * this.scale;
        if (
            lx > 0 &&
            lx < this.width &&
            ly < viewport.height &&
            ly > viewport.height - this.height
        ) {
            game.ctx.fillStyle = game.planets[i].leftToCircle > 0 ? this.color : this.fullColor;
            game.ctx.fillRect(lx - pw, ly - py, 2 * pw, 2 * py);
            game.ctx.fillStyle = map.bgColor;
            game.ctx.fillText('m:' + game.planets[i].mass + ',u:' + Math.max(game.planets[i].leftToCircle, 0) , lx, ly);
        }
    }
};