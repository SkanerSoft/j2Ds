/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/TimeManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var TimeManager = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.times = {};

        this.insert = function (id) {
            if (!this.times[id]) {
                this.times[id] = this.j2Ds.now;
            }
        };

        this.get = function (id) {
            return this.times[id];
        };
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.TimeManager = TimeManager;
    if (global.j2Ds !== undefined) global.modules.managers.TimeManager = TimeManager;
    return TimeManager;
}));

