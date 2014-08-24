var splashScreen = {
};

splashScreen.texts = [
    'You control the postal space ship.',
    '(UP - accelerate, DOWN - break, LEFT,RIGHT - rotate,',
    'SPACE - pause)',
    'Your aim is to deliver maximum goods to the ',
    'planets in a specified interval of time.',
    'Drop them by orbiting around the planet in a gray zone',
    '1 round = 1 unit',
    'Game stops before time if',
    '1. you press R on your keyboard',
    '2. you hit the planet',
    '3. there are no units left to drop',
    '',
    'PRESS SPACE TO START',
    '', '---','',
    'BEST WORLD CONNECTORS:'
];

splashScreen.init = function() {
    document.body.onkeydown = function(e) {
        if (e.which === 32 /* key space */) {
            reset();
            game.showSplashScreen = false;
        }
    };
    game.showSplashScreen = true;
};

splashScreen.draw = function() {
    map.drawBg();

    game.ctx.textBaseline = 'top';

    game.ctx.font = '15px monospace';
    game.ctx.textAlign = 'center';
    game.ctx.fillStyle = 'rgba(224, 240, 232, 0.6)';
    game.ctx.fillText('Intergalactic postal service', viewport.width / 2 | 0, 30);
    game.ctx.font = '40px monospace';
    game.ctx.fillText('"World connectors"', viewport.width / 2 | 0, 50);

    game.ctx.font = '15px monospace';
    game.ctx.textAlign = 'center';
    game.ctx.fillStyle = 'rgba(224, 240, 232, 0.6)';
    for (var i = 0; i < this.texts.length; i++) {
        game.ctx.fillText(this.texts[i], viewport.width / 2 | 0, 130 + i * 20);
    }

    game.ctx.fillStyle = '#e6d69c';
    var startI = i;
    for (; i < game.highScores.length + startI; i++) {
        game.ctx.fillText((i - startI === game.lastRank ? '>' : '') + (i - startI + 1) + ') ' + game.highScores[i - startI], viewport.width / 2 | 0, 130 + i * 20);
    }
};