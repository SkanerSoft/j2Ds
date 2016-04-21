/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('core/Events', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var Events = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.events = {
            'scene:deactivate': [],
            'scene:activate': [],

            'scene:beforeInit': [],
            'scene:afterInit': [],
            'scene:beforeStart': [],
            'scene:afterStart': [],

            'engine:before': [],
            'engine:after': [],

            'scene:changedGameState': [],

            'writeMode:keyPress': [],

            'dom:loaded': []
        };
    };


    Events.prototype.addEvent = function (eventType, callback, id) {
        this.events[eventType].push({
            id: id || this.j2Ds.now,
            callback: callback
        });
        if (this.j2Ds.ready && eventType == 'dom:loaded') {
            this.onEvent('dom:loaded');
            return true;
        }
    };

    Events.prototype.destroyEvent = function (eventType, id) {
        var events = this;
        for (var i = 0, len = events.events[eventType].length; i < len; i += 1) {
            if (events.events[eventType][i]['id'] == id) {
                events.events[eventType].splice(i, 1);
            }
        }
    };

    Events.prototype.onEvent = function (eventType, args) {
        var events = this;
        for (var i = 0, len = events.events[eventType].length; i < len; i += 1) {
            if (events.events[eventType]) {
                try {
                    events.events[eventType][i]['callback'](args || '');
                } catch (err) {
                    events.j2Ds.errorManager.showError(err);
                }
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Events = Events;
    if (global.j2Ds !== undefined) global.modules.core.Events = Events;
    return Events;
}));
