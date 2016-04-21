/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('io/AudioHandler', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var AudioHandler = function () {
        this.audios = {};
        this.enabled = false
    };

    AudioHandler.prototype.init = function () {
        var audioHandler = this;
        this.enabled = true;

        audioHandler.j2Ds.events.addEvent('scene:deactivate', function () {
            audioHandler.deactivate();
        });

        audioHandler.j2Ds.events.addEvent('scene:activate', function () {
            audioHandler.activate();
        });

    };

    AudioHandler.prototype.load = function (id, files, vol) {
        var audioHandler = this;
        audioHandler.j2Ds.resources.add();
        var audio = document.createElement('audio');

        for (var i = 0, len = files.length; i < len; i += 1) {
            var source = document.createElement('source');
            source.src = files[i];
            audio.appendChild(source);
        }

        audio.id = 'audio_' + id;

        if (vol) {
            audio.volume = (vol <= 1 && vol >= 0) ? vol : 1;
        }

        var sound = {
            id: id,
            files: files,
            domEl: audio, // DOMElement
            ready: false,
            len: 0,
            state: 'stop',
            lock: false,
            volume: audio.volume,
            onePlay: false
        };

        sound.domEl.addEventListener('loadeddata', function (e) {
            sound.ready = true;
            var file = e.explicitOriginalTarget || e.path[0];
            audioHandler.j2Ds.resources.ok(file.currentSrc);
        });

        sound.domEl.addEventListener('error', function (e) {
            sound.setLock(true);
            //var file = e.srcElement || e.target;
            //audioHandler.j2Ds.resources.fail(file.src);
        });

        sound.domEl.addEventListener('ended', function () {
            sound.state = 'stop';
        });

        sound.play = function (unlock) {
            if (unlock) {
                this.setLock(false);
            }
            if (this.lock) return;
            if (this.state == 'play') {
                this.domEl.currentTime = 0;
            }
            this.domEl.play();
            this.state = 'play';
        };

        sound.loop = function () {
            if (this.lock) return;
            this.domEl.play();
            this.state = 'play';
        };

        sound.pause = function (lock) {
            if (this.state == 'play') {
                this.setLock(lock);
                this.domEl.pause();
                this.state = 'pause';
            }
        };

        sound.stop = function (lock) {
            this.domEl.pause();
            this.domEl.currentTime = 0;
            this.state = 'stop';
            if (lock) {
                this.setLock(lock);
            }
        };

        sound.setLock = function (lock) {
            this.lock = lock ? true : false;
        };

        sound.setVolume = function (vol) {
            this.domEl.volume = (vol <= 1 && vol >= 0) ? vol : 1;
            this.volume = this.domEl.volume;
        };

        sound.getVolume = function (id) {
            return this.volume;
        };

        sound.getState = function (id) {
            return this.state;
        };

        sound.getPlayPosition = function () {
            return this.domEl.currentTime;
        };

        sound.domEl.load();

        this.audios[id] = sound;
        return sound;
    };

    AudioHandler.prototype.get = function (id) {
        return this.audios[id];
    };

    AudioHandler.prototype.pause = function (lock) {
        for (var snd in this.audios) {
            this.audios[snd].pause(lock);
        }
    };

    AudioHandler.prototype.stop = function (lock) {
        for (var snd in this.audios) {
            this.audios[snd].stop(lock);
        }
    };

    AudioHandler.prototype.play = function (unlock) {
        for (var snd in this.audios) {
            this.audios[snd].play(unlock);
        }
    };

    AudioHandler.prototype.deactivate = function () {
        for (var snd in this.audios) {
            if (this.audios[snd].state == 'play') {
                this.audios[snd].pause();
                this.audios[snd].state = 'deactivated';
            }
        }
    };

    AudioHandler.prototype.activate = function () {
        for (var snd in this.audios) {
            if (this.audios[snd].state == 'deactivated') {
                this.audios[snd].play();
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.AudioHandler = AudioHandler;
    if (global.j2Ds !== undefined) global.modules.io.AudioHandler = AudioHandler;
    return AudioHandler;
}));
