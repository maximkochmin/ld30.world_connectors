/**
 * Helper returns {x: x, y: y} object.
 */
var p = function(x, y) {
    return {x: x, y: y};
};

var atan = function(x, y) {
    if (Math.abs(x) < 1e-15) {
        return (y > 0 ? 1 : -1) * 0.5 * Math.PI;
    }
    var alpha = Math.atan(y / x);
    if (y * alpha < 0) {
        alpha += Math.PI;
    }
    return alpha;
};


/**
 * Container for misc global objects
 * @type {Object}
 */
var game = {
    WIDTH: 640 * 1.5,
    HEIGHT: 480 * 1.5,
    planetDistance: 200,
    planetSize: 16,
    requestId: null,
    loadedImages: {},
    cachedImages: {},
    score: 0,
    maxScore: 0,
    showSplashScreen: true,
    leftToPlay: 0
};

game.highScores = window.localStorage.getItem('ld48_high_scores');
game.highScores = game.highScores === null ? [] : game.highScores.split(',');

game.over = function() {
    this.lastScore = this.score;
    var i = 0;
    for (; i < this.highScores.length; i++) {
        if (this.highScores[i] < this.score) {
            break;
        }
    }
    this.lastRank = i;
    this.highScores.splice(i, 0, this.score);
    this.highScores.splice(10);
    window.localStorage.setItem('ld48_high_scores', this.highScores);
    splashScreen.init();
};
