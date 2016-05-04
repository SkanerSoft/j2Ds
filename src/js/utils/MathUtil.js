/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.4
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

    MathUtil.is4VerticesIntersect = function (a, b) {
        var m, n;
        for (m = 0; m < a.length; m++) {
            for (n = 0; n < b.length; n++) {
                if (MathUtil.isLineIntersect(
                        a[m],
                        a[(m < a.length - 1) ? m + 1 : 0],
                        b[n],
                        b[(n < b.length - 1) ? n + 1 : 0])
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    MathUtil.isLineIntersect = function (a, b, c, d) {
        var dx, g, l;
        dx = (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.y);
        if (dx === 0) {
            return false;
        } else {
            l = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / dx;
            g = ((a.y - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / dx;
            return (0 < l && l < 1) && (0 < g && g < 1);
        }
    };

    MathUtil.isPointInRect = function (a, b, c, d, p) {
        return MathUtil.isPointInTriangle(p, a, b, c) || MathUtil.isPointInTriangle(p, c, d, a);
    };

    var sign = function (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };

    MathUtil.isPointInTriangle = function (pt, v1, v2, v3) {
        var b1, b2, b3;
        b1 = sign(pt, v1, v2) < 0;
        b2 = sign(pt, v2, v3) < 0;
        b3 = sign(pt, v3, v1) < 0;

        return ((b1 == b2) && (b2 == b3));
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.MathUtil = MathUtil;
    if (global.j2Ds !== undefined) global.modules.utils.MathUtil = MathUtil;
    return MathUtil;
}));
