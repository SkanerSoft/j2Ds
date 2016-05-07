/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.3
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('utils/TextureUtil', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    /**
     * Вспомогательный класс содержащий методы для генерации текстур.
     *
     * @class TextureUtil
     * @exports module:utils/TextureUtil
     *
     * @constructor
     */
    var TextureUtil = function (j2Ds) {
        this.j2Ds = j2Ds;
    };

    /**
     * Создает карту текстур
     *
     * @param {number} width
     * @param {number} height
     * @param {function} callback
     * @returns {{img: null|Element, loaded: boolean, width: number, height: number}}
     */
    TextureUtil.prototype.createImageMap = function (width, height, callback) {
        var textureUtil = this;
        textureUtil.j2Ds.resources.add();
        var image = {
            /** @type null|Element */
            img: null,
            loaded: false,
            width: width,
            height: height
        };

        image.img = document.createElement('canvas');
        image.context = image.img.getContext('2d');
        image.img.width = image.width;
        image.img.height = image.height;

        callback(image.context);
        image.loaded = true;

        /**
         * Возвращает анимацию
         *
         * @param {number} sourceX
         * @param {number} sourceY
         * @param {number} sourceW
         * @param {number} sourceH
         * @param {number} frameCount
         * @returns {{imageMap: image, sourceX: number, sourceY: number, sourceW: number, sourceH: number, frameCount: number}}
         */
        image.getAnimation = function (sourceX, sourceY, sourceW, sourceH, frameCount) {
            return {
                imageMap: this,
                sourceX: sourceX,
                sourceY: sourceY,
                sourceW: sourceW,
                sourceH: sourceH,
                frameCount: frameCount - 1
            };
        };

        textureUtil.j2Ds.resources.ok('createImageMap_' + width + 'x' + height);

        return image;
    };

    /**
     * Загружает из файла карту текстур
     *
     * @param {string} path
     * @returns {{img: null, width: number, height: number, loaded: boolean}}
     */
    TextureUtil.prototype.loadImageMap = function (path) {
        var textureUtil = this;
        textureUtil.j2Ds.resources.add();
        var image = {
            /** @type null|Element */
            img: null,
            width: 0,
            height: 0,
            loaded: false
        };

        image.img = document.createElement('img');
        image.crossOrigin = 'anonymous';
        image.img.src = path;

        image.img.addEventListener('load', function () {
            image.width = image.img.width;
            image.height = image.img.height;
            image.loaded = true;
            textureUtil.j2Ds.resources.ok(path);
        });

        image.img.addEventListener('error', function () {
            image.width = 0;
            image.height = 0;
            image.loaded = false;
            //textureUtil.j2Ds.resources.fail(path);
        });
        /* Свойства */

        /**
         * Возвращает анимацию
         *
         * @param {number} sourceX
         * @param {number} sourceY
         * @param {number} sourceW
         * @param {number} sourceH
         * @param {number} frameCount
         * @returns {{imageMap: image, sourceX: number, sourceY: number, sourceW: number, sourceH: number, frameCount: number}}
         */
        image.getAnimation = function (sourceX, sourceY, sourceW, sourceH, frameCount) {
            return {
                imageMap: this,
                sourceX: sourceX,
                sourceY: sourceY,
                sourceW: sourceW,
                sourceH: sourceH,
                frameCount: frameCount - 1
            };
        };

        return image;
    };

    /* -------------------- */

    /**
     * Шаблоны
     *
     * @type {{ellipse: TextureUtil.templates.ellipse, fillRect: TextureUtil.templates.fillRect, strokeRect: TextureUtil.templates.strokeRect, gradientL: TextureUtil.templates.gradientL, gradientR: TextureUtil.templates.gradientR}}
     */
    TextureUtil.prototype.templates = {
        /**
         * Рисует эллипс
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         * @param {string} color
         */
        ellipse: function (context, size, color) { // TODO??
        },

        /**
         * Рисует прямоугольник закрашенный
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         * @param {string} color
         */
        fillRect: function (context, size, color) {
            context.fillStyle = color;
            context.fillRect(0, 0, size.x, size.y);
        },

        /**
         * Рисует пустой прямоугольник
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         * @param {string} color
         * @param {number} lineWidth
         */
        strokeRect: function (context, size, color, lineWidth) {
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.strokeRect(0, 0, size.x, size.y);
        },

        /**
         * Рисует линейным градиентом
         *
         * @param {CanvasRenderingContext2D} context
         * @param {number} size
         * @param {Array.<string>} colors
         * @param {boolean} isHorizontal
         */
        gradientL: function (context, size, colors, isHorizontal) {
            var gradient = context.createLinearGradient(0, 0, size.x, 0);
            var step = 1 / colors.length;
            if (!isHorizontal) {
                gradient = context.createLinearGradient(0, 0, 0, size.y);
            }
            for (var i = step / 2, j = 0; j < colors.length; j += 1, i += step) {
                gradient.addColorStop(i, colors[j]);
            }
            context.fillStyle = gradient;
            context.fillRect(0, 0, size.x, size.y);
        },

        /**
         * Рисует радиальным градиентом
         *
         * @param {CanvasRenderingContext2D} context
         * @param {{x: number, y: number}} size
         * @param {{x: number, y: number}} pos1
         * @param {number} r1
         * @param {{x: number, y: number}} pos2
         * @param {number} r2
         * @param {Array.<string>} colors
         */
        gradientR: function (context, size, pos1, r1, pos2, r2, colors) {
            var gradient = context.createRadialGradient(pos1.x, pos1.y, r1, pos2.x, pos2.y, r2);
            var step = 1 / colors.length;
            for (var i = step / 2, j = 0; j < colors.length; j += 1, i += step) {
                gradient.addColorStop(i, colors[j]);
            }
            context.fillStyle = gradient;
            context.fillRect(0, 0, size.x, size.y);
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.TextureUtil = TextureUtil;
    if (global.j2Ds !== undefined) global.modules.utils.TextureUtil = TextureUtil;
    return TextureUtil;
}));
