/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
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

    var TextureUtil = function (j2Ds) {
        this.j2Ds = j2Ds;
    };

    TextureUtil.prototype.createImageMap = function (_w, _h, callback) {
        var textureUtil = this;
        textureUtil.j2Ds.resources.add();
        var image = {
            img: null,
            loaded: false,
            width: _w,
            height: _h
        };

        image.img = document.createElement('canvas');
        image.context = image.img.getContext('2d');
        image.img.width = image.width;
        image.img.height = image.height;

        callback(image.context);
        image.loaded = true;

        /* Функции */
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

        textureUtil.j2Ds.resources.ok('createImageMap_' + w + 'x' + h);

        return image;
    };

    TextureUtil.prototype.loadImageMap = function (path) {
        var textureUtil = this;
        textureUtil.j2Ds.resources.add();
        var image = {
            img: null,
            width: 0,
            height: 0,
            loaded: false
        };

        image.img = document.createElement('img');
        image.crossOrigin = 'anonymous';
        image.img.src = path;

        image.img.addEventListener('load', function () {
            image.width = o.img.width;
            image.height = o.img.height;
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

        /* Функции */
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

    TextureUtil.prototype.templates = {
        ellipse: function (context, size, color) { // TODO??
        },
        fillRect: function (context, size, color) {
            context.fillStyle = color;
            context.fillRect(0, 0, size.x, size.y);
        },
        strokeRect: function (context, size, color, lineWidth) {
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.strokeRect(0, 0, size.x, size.y);
        },
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
