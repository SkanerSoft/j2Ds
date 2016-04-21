/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/TriggerManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var TriggerManager = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.enabled = false;
        this.triggers = {};
    };

    TriggerManager.prototype.add = function (id, callback) {
        var triggerManager = this;
        var trigger = {
            command: callback,
            count: 0,
            state: 'stop',
            last: false
        };

        trigger.run = function (mSec) {
            if (this.state == 'job') {
                this.command();
                return;
            }
            if (triggerManager.j2Ds.now - this.last > mSec) {
                if (this.last) {
                    this.state = 'job';
                    this.count += 1;
                    this.command();
                }
                this.last = triggerManager.j2Ds.now;
            }
        };

        trigger.job = function (mSec) {
            if (triggerManager.j2Ds.now - this.last > mSec && this.state != 'run') {
                if (this.last) {
                    this.state = 'run';
                    this.count += 1;
                    this.command();
                }
                this.last = triggerManager.j2Ds.now;
            }
        };

        trigger.loop = function (mSec) {
            if (triggerManager.j2Ds.now - this.last > mSec) {
                if (this.last) {
                    this.state = 'run';
                    this.count += 1;
                    this.command();
                }
                this.last = triggerManager.j2Ds.now;
            }
        };

        trigger.reset = function () {
            this.count = 0;
            this.state = 'stop';
            this.last = false;
        };

        this.triggers[id] = trigger;
        return trigger;
    };

    TriggerManager.prototype.get = function (id) {
        return this.triggers[id];
    };

    TriggerManager.prototype.init = function () {
        this.enabled = true;
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.TriggerManager = TriggerManager;
    if (global.j2Ds !== undefined) global.modules.managers.TriggerManager = TriggerManager;
    return TriggerManager;
}));
