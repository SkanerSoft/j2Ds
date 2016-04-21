/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('utils/MathUtil', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var MathUtil = function () {
    };

    MathUtil.v2f = function (x, y) {
        return {x: x, y: y};
    };

    MathUtil.v2i = function (x, y) {
        return {x: (x >> 0), y: (y >> 0)};
    };

    MathUtil.toInt = function (number) {
        return number >> 0;
    };

    MathUtil.rndColor = function (min, max, opacity) {
        return 'rgba('
            + MathUtil.random(min, max) + ', '
            + MathUtil.random(min, max) + ', '
            + MathUtil.random(min, max) + ', '
            + opacity + ')';
    };

    MathUtil.random = function (min, max, omitZero) {
        var random = (Math.floor(Math.random() * (max - min + 1) + min));
        return (omitZero && random == 0)
            ? MathUtil.random(min, max, omitZero)
            : random;
    };

    MathUtil.rad = function (num) {
        return num * (Math.PI / 180);
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.MathUtil = MathUtil;
    if (global.j2Ds !== undefined) global.modules.utils.MathUtil = MathUtil;
    return MathUtil;
}));
