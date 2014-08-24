/**
 * Viewport
 * @type {Object}
 */
var viewport = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};

viewport.update = function() {
    viewport.x = ship.pos.x - viewport.width / 2 | 0;
    viewport.y = ship.pos.y - viewport.height / 2 | 0;
};