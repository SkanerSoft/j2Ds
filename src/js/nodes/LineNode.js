/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/LineNode', ['nodes/BaseNode', 'utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('nodes/BaseNode'), require('utils/MathUtil'));
    } else {
        factory(root.modules.nodes.BaseNode, root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (BaseNode, MathUtil) {
    "use strict";

    var j2Ds;

    var LineNode = function (_j2Ds, pos, points, scale, color, width, fill, cFill) {
        j2Ds = _j2Ds;
        BaseNode.call(this, _j2Ds, pos, MathUtil.v2f(0, 0));

        /*Свойства*/
        this.color = color;
        this.points = points;
        this.fill = fill || false;
        this.scale = scale || 0;
        this.cFill = cFill;
        this.lineWidth = width;
    };

    LineNode.prototype = Object.create(BaseNode.prototype);
    LineNode.prototype.constructor = LineNode;

    LineNode.prototype.draw = function () {
        var context = this.layer.context;
        if (this.visible && this.isLookScene()) {

            if (this.alpha != 1) {
                var tmpAlpha = context.globalAlpha;
                context.globalAlpha = this.alpha;
            }

            context.strokeStyle = this.color;
            context.lineWidth = this.lineWidth;

            context.beginPath();
            context.moveTo(this.pos.x - j2Ds.scene.view.pos.x,
                this.pos.y - j2Ds.scene.view.pos.y);

            for (var i = 0, len = this.points.length; i < len; i += 1) {
                context.lineTo(
                    this.pos.x + this.points[i][0] * this.scale - j2Ds.scene.view.pos.x,
                    this.pos.y + this.points[i][1] * this.scale - j2Ds.scene.view.pos.y);
            }

            context.stroke();
            if (this.fill) {
                context.fillStyle = this.cFill;
                context.fill();
            }

            context.lineWidth = 0;

            if (this.alpha != 1) {
                context.globalAlpha = tmpAlpha;
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.LineNode = LineNode;
    if (global.j2Ds !== undefined) global.modules.nodes.LineNode = LineNode;
    return LineNode;
}));
