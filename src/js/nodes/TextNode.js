/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/TextNode', ['nodes/BaseNode', 'utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('nodes/BaseNode'), require('utils/MathUtil'));
    } else {
        factory(root.modules.nodes.BaseNode, root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (BaseNode, MathUtil) {
    "use strict";

    var j2Ds;

    /**
     * @exports module:nodes/TextNode
     */
    var TextNode;
    
    /**
     * Примитивный узел для отрисовки текста.
     *
     * @class TextNode
     *
     * @constructor
     * @extends module:nodes/BaseNode
     * 
     * @param {j2DsEngine} j2DsEngine
     * @param {{x: number, y: number}} pos
     * @param {string} text
     * @param {number} sizePx
     * @param {string} color
     * @param {string} family
     * @param {number} width
     * @param {string} colorL
     *
     * @property {number} vAlign
     * @property {number} hAlign
     * @property {string} color
     * @property {string} family
     * @property {number} sizePx
     * @property {number} lineWidth
     * @property {string} colorL
     * @property {string} font
     * @property {string} fullText
     * @property {number} maxWidth
     * @property {Array.<string>} lines
     */
    TextNode = function (j2DsEngine, pos, text, sizePx, color, family, width, colorL) {
        j2Ds = j2DsEngine;
        BaseNode.call(this, j2DsEngine, pos, MathUtil.v2f(0, 0));

        /*Свойства*/

        this.vAlign = 'top';
        this.hAlign = 'left';
        this.color = color ? color : 'black';

        this.family = family ? family : 'serif';
        this.sizePx = sizePx ? sizePx : 20;

        this.box.offset.y = MathUtil.toInt(this.sizePx * 0.26);
        this.box.size.y = -MathUtil.toInt(this.sizePx * 0.26);

        this.lineWidth = width ? width : 0;
        this.colorL = colorL ? colorL : 'black';

        this.font = this.sizePx + 'px ' + this.family;

        this.fullText = text;
        this.maxWidth = 0;
        this.lines = text.split("\n");

        j2Ds.scene.context.font = this.font;

        for (var i = 0, len = this.lines.length; i < len; i += 1) {
            this.maxWidth = (this.maxWidth < j2Ds.scene.context.measureText(this.lines[i]).width ?
                j2Ds.scene.context.measureText(this.lines[i]).width :
                this.maxWidth);
        }

        this.size.x = this.maxWidth;
        this.size.y = this.lines.length * this.sizePx;
    };

    TextNode.prototype = Object.create(BaseNode.prototype);
    TextNode.prototype.constructor = TextNode;

    /**
     * Устанавливает размер текста
     *
     * @param {number} sizePx
     */
    TextNode.prototype.setSize = function (sizePx) {
        this.sizePx = sizePx;
        this.font = this.sizePx + 'px ' + this.family;
        j2Ds.scene.context.font = this.font;

        this.box.offset.y = MathUtil.toInt(this.sizePx * 0.26);
        this.box.size.y = -MathUtil.toInt(this.sizePx * 0.26);

        for (var i = 0, len = this.lines.length; i < len; i += 1) {
            this.maxWidth = (this.maxWidth < j2Ds.scene.context.measureText(this.lines[i]).width ?
                j2Ds.scene.context.measureText(this.lines[i]).width :
                this.maxWidth);
        }
        this.size.x = this.maxWidth;
        this.size.y = this.lines.length * this.sizePx;
    };

    /**
     * Возвращает текущий размер
     *
     * @returns {number}
     */
    TextNode.prototype.getSize = function () {
        return this.sizePx;
    };

    /**
     * Метод для быстрого изменения текста и его последующей отрисовки.
     *
     * @deprecated
     * @param {string} text
     * @param {{x: number, y: number}} pos
     * @param {string} color
     * @param {string} colorL
     */
    TextNode.prototype.drawSimpleText = function (text, pos, color, colorL) {
        var context = this.layer.context;
        context.fillStyle = color ? color : this.color;
        context.textAlign = this.hAlign;
        context.textBaseline = this.vAlign;
        context.font = this.font;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = colorL ? colorL : this.colorL;

        var lines = text.split("\n");

        pos = pos ? pos : this.pos;

        if (this.alpha != 1) {
            var tmpAlpha = context.globalAlpha;
            context.globalAlpha = this.alpha;
        }

        for (var i = 0, len = lines.length; i < len; i += 1) {
            if (this.lineWidth) {
                context.strokeText(lines[i], pos.x, pos.y + this.sizePx * i);
            }
            context.fillText(lines[i], pos.x, pos.y + this.sizePx * i);
        }

        if (this.alpha != 1) {
            context.globalAlpha = tmpAlpha;
        }

        context.lineWidth = 0;
        context.strokeStyle = 'black';
    };

    /**
     * Возвращает текст
     *
     * @returns {string}
     */
    TextNode.prototype.getText = function () {
        return this.fullText;
    };

    /**
     * Устанавливает текст
     *
     * @param {string} text
     */
    TextNode.prototype.setText = function (text) {
        this.fullText = text;
        this.maxWidth = 0;
        this.lines = text.split("\n");

        j2Ds.scene.context.font = this.font;

        this.box.offset.y = MathUtil.toInt(this.sizePx * 0.26);
        this.box.size.y = -MathUtil.toInt(this.sizePx * 0.26);

        for (var i = 0, len = this.lines.length; i < len; i += 1) {
            this.maxWidth = (this.maxWidth < j2Ds.scene.context.measureText(this.lines[i]).width ?
                j2Ds.scene.context.measureText(this.lines[i]).width :
                this.maxWidth);
        }
        this.size.x = this.maxWidth;
        this.size.y = this.lines.length * this.sizePx;
    };

    /**
     * Метод для отрисовки узла
     */
    TextNode.prototype.draw = function () {
        var context = this.layer.context;
        if (this.visible && this.isLookScene()) {
            if (this.alpha != 1) {
                var tmpAlpha = context.globalAlpha;
                context.globalAlpha = this.alpha;
            }

            if (this.angle) {
                context.save();
                context.translate(this.getPosition().x - j2Ds.scene.view.pos.x, this.getPosition().y - j2Ds.scene.view.pos.y);
                context.rotate(MathUtil.rad(this.angle));
                context.translate(-(this.getPosition().x - j2Ds.scene.view.pos.x), -(this.getPosition().y - j2Ds.scene.view.pos.y));
            }

            context.fillStyle = this.color;
            context.textAlign = this.hAlign;
            context.textBaseline = this.vAlign;
            context.font = this.font;
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.colorL;

            for (var i = 0, len = this.lines.length; i < len; i += 1) {
                if (this.lineWidth) {
                    context.strokeText(this.lines[i], this.pos.x - j2Ds.scene.view.pos.x, this.pos.y + this.sizePx * i - j2Ds.scene.view.pos.y);
                }
                context.fillText(this.lines[i], this.pos.x - j2Ds.scene.view.pos.x, this.pos.y + this.sizePx * i - j2Ds.scene.view.pos.y);
            }

            context.lineWidth = 0;
            context.strokeStyle = 'black';

            if (this.angle) {
                context.restore();
            }

            if (this.alpha != 1) {
                context.globalAlpha = tmpAlpha;
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.TextNode = TextNode;
    if (global.j2Ds !== undefined) global.modules.nodes.TextNode = TextNode;
    return TextNode;
}));
