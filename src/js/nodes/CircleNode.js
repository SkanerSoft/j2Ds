/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/CircleNode', ['nodes/BaseNode', 'utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('nodes/BaseNode'), require('utils/MathUtil'));
    } else {
        factory(root.modules.nodes.BaseNode, root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (BaseNode, MathUtil) {
    "use strict";

    var j2Ds;

    /**
     * @exports module:nodes/CircleNode
     */
    var CircleNode;

    /**
     * Примитивный узел для отрисовки круга.
     *
     * @class CircleNode
     *
     * @constructor
     * @extends module:nodes/BaseNode
     * @param {j2DsEngine} j2DsEngine
     * @param {{x: number, y: number}} pos
     * @param {number} radius
     * @param {string} color
     *
     * @property {string} color
     * @property {number} radius
     */
    CircleNode = function (j2DsEngine, pos, radius, color) {
        j2Ds = j2DsEngine;
        BaseNode.call(this, j2DsEngine, pos, MathUtil.v2f(radius * 2, radius * 2));

        /*Свойства*/
        this.color = color;
        this.radius = radius;
    };

    CircleNode.prototype = Object.create(BaseNode.prototype);
    CircleNode.prototype.constructor = CircleNode;

    /**
     * Метод для отрисовки узла
     */
    CircleNode.prototype.draw = function () {
        var context = this.layer.context;
        if (this.visible && this.isLookScene()) {
            if (this.alpha != 1) {
                var tmpAlpha = context.globalAlpha;
                context.globalAlpha = this.alpha;
            }
            context.lineWidth = 0;
            context.fillStyle = this.color;

            context.beginPath();
            context.arc(this.pos.x - j2Ds.scene.view.pos.x + this.radius,
                this.pos.y - j2Ds.scene.view.pos.y + this.radius,
                this.radius, 0, 2 * Math.PI, true);
            context.stroke();
            context.fill();

            if (this.alpha != 1) {
                context.globalAlpha = tmpAlpha;
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.CircleNode = CircleNode;
    if (global.j2Ds !== undefined) global.modules.nodes.CircleNode = CircleNode;
    return CircleNode;
}));
