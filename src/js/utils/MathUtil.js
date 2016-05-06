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

    /**
     * Вспомогательный класс содержащий статичные методы для облегчения расчетов.
     *
     * @class MathUtil
     * @exports module:utils/MathUtil
     *
     * @constructor
     */
    var MathUtil = function () {
    };

    /**
     * Вектор
     *
     * @param {number} x
     * @param {number} y
     * @returns {{x: number, y: number}}
     */
    MathUtil.v2f = function (x, y) {
        return {x: x, y: y};
    };

    /**
     * Целочисленный вектор
     *
     * @param {number} x
     * @param {number} y
     * @returns {{x: number, y: number}}
     */
    MathUtil.v2i = function (x, y) {
        return {x: (x >> 0), y: (y >> 0)};
    };

    /**
     * Приведение типа числа к целочисленному
     *
     * @alias parseInt()
     * @param number
     * @returns {number}
     */
    MathUtil.toInt = function (number) {
        return number >> 0;
    };

    /**
     * Случайный цвет
     *
     * @param {number} min 0..256
     * @param {number} max 0..256
     * @param {number} opacity 0.0 ~ 1.0
     * @returns {string} rgba(0..256, 0..256, 0..256, 0.0 ~ 1.0)
     */
    MathUtil.rndColor = function (min, max, opacity) {
        return 'rgba('
            + MathUtil.random(min, max) + ', '
            + MathUtil.random(min, max) + ', '
            + MathUtil.random(min, max) + ', '
            + opacity + ')';
    };

    /**
     * Случайное число
     *
     * @param min Минимальное
     * @param max Максимальное
     * @param omitZero Включая нуль?
     * @returns {number}
     */
    MathUtil.random = function (min, max, omitZero) {
        var random = (Math.floor(Math.random() * (max - min + 1) + min));
        return (omitZero && random == 0)
            ? MathUtil.random(min, max, omitZero)
            : random;
    };

    /**
     * Приведение градусов в радианы
     *
     * @param {number} num 0..360
     * @returns {number}
     */
    MathUtil.rad = function (num) {
        return num * (Math.PI / 180);
    };

    /**
     * Проверка пересечения отрезков вершин двух фигур
     *
     * @param {Array.<{x: number, y: number}>} a
     * @param {Array.<{x: number, y: number}>} b
     * @returns {boolean}
     */
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

    /**
     * Проверка пересечения отрезков
     *
     * @param {{x: number, y: number}} a Начальная точка первого отрезка
     * @param {{x: number, y: number}} b Конечная точка первого отрезка
     * @param {{x: number, y: number}} c Начальная точка второго отрезка
     * @param {{x: number, y: number}} d Конечная точка второго отрезка
     * @returns {boolean}
     */
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

    /**
     * Проверка принадлежности точки прямоугольнику
     *
     * @param {{x: number, y: number}} a 1-я вершина прямоугольника
     * @param {{x: number, y: number}} b 2-я вершина прямоугольника
     * @param {{x: number, y: number}} c 3-я вершина прямоугольника
     * @param {{x: number, y: number}} d 4-я вершина прямоугольника
     * @param {{x: number, y: number}} p Точка
     * @returns {boolean}
     */
    MathUtil.isPointInRect = function (a, b, c, d, p) {
        return MathUtil.isPointInTriangle(p, a, b, c) || MathUtil.isPointInTriangle(p, c, d, a);
    };

    /**
     * Служебная функция для проверки принадлежности точки треугольнику
     *
     * @param {{x: number, y: number}} p1
     * @param {{x: number, y: number}} p2
     * @param {{x: number, y: number}} p3
     * @returns {number}
     */
    var sign = function (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };

    /**
     * Проверка принадлежности точки треугольнику
     *
     * @param {{x: number, y: number}} pt Точка
     * @param {{x: number, y: number}} a 1-я вершина прямоугольника
     * @param {{x: number, y: number}} b 2-я вершина прямоугольника
     * @param {{x: number, y: number}} c 3-я вершина прямоугольника
     * @returns {boolean}
     */
    MathUtil.isPointInTriangle = function (pt, a, b, c) {
        var b1, b2, b3;
        b1 = sign(pt, a, b) < 0;
        b2 = sign(pt, b, c) < 0;
        b3 = sign(pt, c, a) < 0;

        return ((b1 == b2) && (b2 == b3));
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.MathUtil = MathUtil;
    if (global.j2Ds !== undefined) global.modules.utils.MathUtil = MathUtil;
    return MathUtil;
}));
