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

    MathUtil.is4VerticesIntersect = function checkLineIntersection(a, b) {
        return !!(MathUtil.isLineIntersect(a.a, a.b, b.a, b.b) ||
        MathUtil.isLineIntersect(a.a, a.b, b.b, b.c) ||
        MathUtil.isLineIntersect(a.a, a.b, b.c, b.d) ||
        MathUtil.isLineIntersect(a.a, a.b, b.d, b.a) ||

        MathUtil.isLineIntersect(a.b, a.c, b.a, b.b) ||
        MathUtil.isLineIntersect(a.b, a.c, b.b, b.c) ||
        MathUtil.isLineIntersect(a.b, a.c, b.c, b.d) ||
        MathUtil.isLineIntersect(a.b, a.c, b.d, b.a) ||

        MathUtil.isLineIntersect(a.c, a.d, b.a, b.b) ||
        MathUtil.isLineIntersect(a.c, a.d, b.b, b.c) ||
        MathUtil.isLineIntersect(a.c, a.d, b.c, b.d) ||
        MathUtil.isLineIntersect(a.c, a.d, b.d, b.a) ||

        MathUtil.isLineIntersect(a.d, a.a, b.a, b.b) ||
        MathUtil.isLineIntersect(a.d, a.a, b.b, b.c) ||
        MathUtil.isLineIntersect(a.d, a.a, b.c, b.d) ||
        MathUtil.isLineIntersect(a.d, a.a, b.d, b.a));
        
    };

    MathUtil.isLineIntersect = function checkLineIntersection(a, b, c, d) {
        var fcc1 = MathUtil.rotationDirection(a.x, a.y, b.x, b.y, d.x, d.y);
        var fcc2 = MathUtil.rotationDirection(a.x, a.y, b.x, b.y, c.x, c.y);
        var fcc3 = MathUtil.rotationDirection(a.x, a.y, c.x, c.y, d.x, d.y);
        var fcc4 = MathUtil.rotationDirection(b.x, b.y, c.x, c.y, d.x, d.y);

        if (fcc1 == 0 && fcc2 == 0 && fcc3 == 0 && fcc4 == 0) return false;
        return fcc1 != fcc2 && fcc3 != fcc4;
    };

    MathUtil.rotationDirection = function (p1x, p1y, p2x, p2y, p3x, p3y) {
        if (((p3y - p1y) * (p2x - p1x)) > ((p2y - p1y) * (p3x - p1x)))
            return 1;
        else if (((p3y - p1y) * (p2x - p1x)) == ((p2y - p1y) * (p3x - p1x)))
            return 0;
        return -1;
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.MathUtil = MathUtil;
    if (global.j2Ds !== undefined) global.modules.utils.MathUtil = MathUtil;
    return MathUtil;
}));
