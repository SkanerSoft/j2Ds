/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/FpsManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var FpsManager = function (j2Ds) {
        this.j2Ds = j2Ds;

        this.enabled = false;
        this.fps = this.j2Ds.frameLimit;
        this.tmp_of_fps = 1;
        this.tmp_of_time = Date.now();
    };

    FpsManager.prototype.init = function () {
        var fpsManager = this;
        fpsManager.enabled = true;

        this.j2Ds.events.addEvent('engine:after', function () {
            fpsManager.update();
        });
    };

    FpsManager.prototype.update = function () {
        if (!this.enabled) return;
        this.tmp_of_fps += 1;
        if (this.j2Ds.now - this.tmp_of_time >= 1000) {
            this.fps = this.tmp_of_fps;
            this.tmp_of_fps = 1;
            this.tmp_of_time = this.j2Ds.now;
        }
    };

    FpsManager.prototype.getFPS = function () {
        return this.fps <= this.j2Ds.frameLimit ? this.fps : this.j2Ds.frameLimit;
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.FpsManager = FpsManager;
    if (global.j2Ds !== undefined) global.modules.managers.FpsManager = FpsManager;
    return FpsManager;
}));
