/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/RectNode', ['nodes/BaseNode', 'utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('nodes/BaseNode'), require('utils/MathUtil'));
    } else {
        factory(root.modules.nodes.BaseNode, root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (BaseNode, MathUtil) {
    "use strict";

    var j2Ds;

    /**
     * @param _j2Ds
     * @param pos
     * @param size
     * @param color
     * @constructor
     */
    var RectNode = function (_j2Ds, pos, size, color) {
        j2Ds = _j2Ds;
        BaseNode.call(this, _j2Ds, pos, size);

        this.color = color;
    };

    RectNode.prototype = Object.create(BaseNode.prototype);
    RectNode.prototype.constructor = RectNode;

    RectNode.prototype.draw = function () {
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
            context.lineWidth = 0;

            context.fillRect(
                this.pos.x - j2Ds.scene.view.pos.x,
                this.pos.y - j2Ds.scene.view.pos.y,
                this.size.x, this.size.y);

            if (this.angle) {
                context.restore();
            }

            if (this.alpha != 1) {
                context.globalAlpha = tmpAlpha;
            }
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.RectNode = RectNode;
    if (global.j2Ds !== undefined) global.modules.nodes.RectNode = RectNode;
    return RectNode;
}));
