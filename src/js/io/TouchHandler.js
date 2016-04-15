/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2-dev
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('io/TouchHandler', ['utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('utils/MathUtil'));
    } else {
        factory(root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (MathUtil) {
    "use strict";

    var TouchHandler = function (j2Ds) {
        this.j2Ds = j2Ds;

        this.enabled = false;
        this.pos = {x: 0, y: 0};
        this.screenPos = {x: 0, y: 0};
        this.canceled = false;
        this.touchs = [];
        this.tapDown = false;
        this.tapPress = false;
        this.tapUp = false;
        this.body = false;
    };

    TouchHandler.prototype.getPosition = function () {
        return MathUtil.v2f(this.pos.x, this.pos.y);
    };

    TouchHandler.prototype.getScreenPosition = function () {
        return MathUtil.v2f(this.screenPos.x, this.screenPos.y);
    };

    TouchHandler.prototype.upd = function () {
        if (!this.enabled) return false;
        var dX = this.j2Ds.scene.offsetWidth / this.j2Ds.scene.width;
        var dY = this.j2Ds.scene.offsetHeight / this.j2Ds.scene.height;

    };

    TouchHandler.prototype.reset = function () {
        if (!this.enabled) return false;
    };

    TouchHandler.prototype.cancel = function () {
        if (!this.enabled) return false;
    };

    TouchHandler.prototype.isTapDown = function () {

    };

    TouchHandler.prototype.isTapPress = function () {

    };

    TouchHandler.prototype.isTapUp = function () {

    };

    TouchHandler.prototype.getTouch = function () {

    };

    TouchHandler.prototype.onTouchEvent = function () {
        if (!this.enabled) return false;

    };


    TouchHandler.prototype.init = function () {
        var touchHandler = this;
        touchHandler.enabled = true;

        touchHandler.j2Ds.events.addEvent('engine:before', function () {
            touchHandler.upd();
        });

        touchHandler.j2Ds.events.addEvent('engine:after', function () {
            touchHandler.reset();
        });


        touchHandler.j2Ds.events.addEvent('dom:loaded', function () {

        });
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.TouchHandler = TouchHandler;
    if (global.j2Ds !== undefined) global.modules.io.TouchHandler = TouchHandler;
    return TouchHandler;
}));
