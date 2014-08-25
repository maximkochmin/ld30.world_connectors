var Audio = function(sounds) {
    try {
        this.ctx = new webkitAudioContext();
    } catch (e) {
        this.ctx = null;
    }
    this.sounds = sounds;
};


Audio.prototype.loadSounds = function(callback) {
    if (this.ctx === null) {
        callback();
        return;
    }
    this.buffers = [];
    this.callback = callback;
    var request;
    for (var i = 0; i < this.sounds.length; i++) {
        request = new XMLHttpRequest();
        request.open('GET', this.sounds[i], true);
        request.responseType = "arraybuffer";
        request.onload = this.onSoundLoaded.bind(this, request, i);
        request.send();
    }
};


Audio.prototype.onSoundLoaded = function(request, soundId) {
    this.ctx.decodeAudioData(request.response, this.onBufferDecoded.bind(this));
};


Audio.prototype.onBufferDecoded = function(buffer) {
    if (!buffer) {
        throw 'Can not decode audio';
    }
    this.buffers.push(buffer);
    if (this.buffers.length === this.sounds.length) {
        this.callback();
    }
};


Audio.prototype.playSound = function(name) {
    if (this.ctx === null) {
        return;
    }
    name = this.sounds.indexOf(name);
    var s = this.ctx.createBufferSource();
    s.buffer = this.buffers[name];
    s.connect(this.ctx.destination);
    s.start(this.ctx.currentTime);
};