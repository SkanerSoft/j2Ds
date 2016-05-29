/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.4
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/BaseNode', ['utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('utils/MathUtil'));
    } else {
        factory(root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (MathUtil) {
    "use strict";

    var j2Ds;

    /**
     * @exports module:nodes/BaseNode
     */
    var BaseNode;

    /**
     * Базовый класс о общими методами для всех узлов.
     *
     * @class BaseNode
     * @alias module:nodes/BaseNode
     *
     * @abstract
     * @constructor
     * @param {j2DsEngine} j2DsEngine
     * @param {{x: number, y: number}} pos
     * @param {{x: number, y: number}} size
     *
     * @property {boolean} visible
     * @property {number} alpha
     * @property {{x: number, y: number}} pos
     * @property {{x: number, y: number}} size
     * @property {boolean} parent
     * @property {number} angle
     * @property {core/Scene} layer
     * @property {{offset: {x: number, y: number}, size: {x: number, y: number}}} box
     */
    BaseNode = function (j2DsEngine, pos, size) {
        j2Ds = j2DsEngine;
        this.visible = true;
        this.alpha = 1;
        this.pos = pos;
        this.size = size;
        this.parent = false;
        this.angle = 0;
        this.layer = j2Ds.scene;
        this.box = {
            offset: {
                x: 0,
                y: 0
            },
            size: {
                x: 0,
                y: 0
            }
        };
        j2Ds.scene.nodes.push(this);
    };

    /**
     *
     * @param {{x: number, y: number}} offset
     * @param {{x: number, y: number}} size
     */
    BaseNode.prototype.resizeBox = function (offset, size) {
        this.box.offset = offset;
        this.box.size = size;
    };

    /**
     *
     * @param layer
     */
    BaseNode.prototype.setLayer = function (layer) {
        this.layer = layer ? j2Ds.layers.layer(layer) : j2Ds.scene;
    };

    /**
     *
     * @returns {*}
     */
    BaseNode.prototype.getLayer = function () {
        return this.layer;
    };

    /**
     *
     * @param visible
     */
    BaseNode.prototype.setVisible = function (visible) {
        this.visible = !!visible;
    };

    /**
     *
     * @returns {boolean|*}
     */
    BaseNode.prototype.isVisible = function () {
        return this.visible;
    };

    /**
     *
     * @param alpha
     */
    BaseNode.prototype.setAlpha = function (alpha) {
        if (alpha < 0) alpha = 0;
        if (alpha > 1) alpha = 1;
        this.alpha = alpha;
    };

    /**
     *
     * @returns {*|number}
     */
    BaseNode.prototype.getAlpha = function () {
        return this.alpha;
    };

    /**
     *
     * @param to
     * @param t
     */
    BaseNode.prototype.moveTo = function (to, t) {
        t = t ? t : 1;
        this.move(MathUtil.v2f(
            ((to.x - this.getPosition().x) / t),
            ((to.y - this.getPosition().y) / t)
        ));
    };

    /**
     *
     * @param pos
     * @returns {*}
     */
    BaseNode.prototype.setPosition = function (pos) {
        if (pos) {
            this.pos = MathUtil.v2f(pos.x - Math.ceil(this.size.x / 2), pos.y - Math.ceil(this.size.y / 2));
        } else {
            return this.pos;
        }
    };

    /**
     *
     * @param pos
     */
    BaseNode.prototype.move = function (pos) {
        this.pos.x += pos.x;
        this.pos.y += pos.y;
    };

    /**
     *
     * @returns {{x, y}|{x: number, y: number}}
     */
    BaseNode.prototype.getPosition = function () {
        return MathUtil.v2f(this.pos.x + Math.ceil(this.size.x / 2), this.pos.y + Math.ceil(this.size.y / 2));
    };

    /**
     *
     * @param size
     * @returns {*}
     */
    BaseNode.prototype.setSize = function (size) {
        if (size) {
            this.size = size;
        } else {
            return this.size;
        }
    };

    /**
     *
     * @returns {*}
     */
    BaseNode.prototype.getSize = function () {
        return this.size;
    };

    /**
     *
     * @param id
     */
    BaseNode.prototype.setParent = function (id) {
        this.parent = id;
    };

    /**
     *
     * @param id
     * @returns {number}
     */
    BaseNode.prototype.getDistance = function (id) {
        return Math.ceil(Math.sqrt(
                Math.pow(id.getPosition().x - this.getPosition().x, 2) +
                Math.pow(id.getPosition().y - this.getPosition().y, 2)
            )
        );
    };

    /**
     *
     * @param id
     * @returns {{x, y}|{x: number, y: number}}
     */
    BaseNode.prototype.getDistanceXY = function (id) {
        return MathUtil.v2f(Math.abs(id.getPosition().x - this.getPosition().x), Math.abs(id.getPosition().y - this.getPosition().y));
    };

    /**
     *
     * @param node
     * @returns {{x1: *, x2: *, y1: *, y2: *}}
     */
    BaseNode.prototype.getBox = function (node) {
        return {
            x1: node.pos.x + node.box.offset.x,
            x2: node.pos.x + node.box.offset.x + node.size.x + node.box.size.x,
            y1: node.pos.y + node.box.offset.y,
            y2: node.pos.y + node.box.offset.y + node.size.y + node.box.size.y
        }
    };

    /**
     *
     * @param {BaseNode} node
     * @returns {Array.<{x: number, y: number}>}
     */
    BaseNode.prototype.getBoxVertices = function (node) {
        if (node === undefined) node = this;
        var angle = -MathUtil.rad(node.angle);

        var dx = node.box.offset.x + node.box.size.x / 2 + node.getPosition().x - j2Ds.scene.view.pos.x;
        var dy = node.box.offset.y + node.box.size.y / 2 + node.getPosition().y - j2Ds.scene.view.pos.y;

        var box = this.getBox(node);

        return [
            {
                x: (dx + (box.y1 - dy) * Math.sin(angle) + (box.x2 - dx) * Math.cos(angle)).toFixed(5),
                y: (dy + (box.y1 - dy) * Math.cos(angle) - (box.x2 - dx) * Math.sin(angle)).toFixed(5)
            },
            {
                x: (dx + (box.y2 - dy) * Math.sin(angle) + (box.x2 - dx) * Math.cos(angle)).toFixed(5),
                y: (dy + (box.y2 - dy) * Math.cos(angle) - (box.x2 - dx) * Math.sin(angle)).toFixed(5)
            },
            {
                x: (dx + (box.y2 - dy) * Math.sin(angle) + (box.x1 - dx) * Math.cos(angle)).toFixed(5),
                y: (dy + (box.y2 - dy) * Math.cos(angle) - (box.x1 - dx) * Math.sin(angle)).toFixed(5)
            },
            {
                x: (dx + (box.y1 - dy) * Math.sin(angle) + (box.x1 - dx) * Math.cos(angle)).toFixed(5),
                y: (dy + (box.y1 - dy) * Math.cos(angle) - (box.x1 - dx) * Math.sin(angle)).toFixed(5)
            }
        ]
    };

    /**
     *
     * @param node1
     * @param node2
     * @returns {*}
     */
    var checkBoxIntersect = function (node1, node2) {
        var a, b;
        if (node1.angle === 0 && node2.angle === 0) {
            a = node1.getBox(node1);
            b = node1.getBox(node2);

            return !(a.y1 > b.y2 || a.y2 < b.y1 || a.x2 < b.x1 || a.x1 > b.x2);
        } else {
            a = node1.getBoxVertices(node1);
            b = node1.getBoxVertices(node2);

            if (!MathUtil.is4VerticesIntersect(a, b)) {
                return node1.isPointInsideBox(a, node2.getPosition())
                    || node2.isPointInsideBox(b, node1.getPosition());
            }
            return true;
        }
    };

    /**
     *
     * @param vf
     * @param point
     * @returns {boolean}
     */
    BaseNode.prototype.isPointInsideBox = function (vf, point) {
        return MathUtil.isPointInRect(vf[0], vf[1], vf[2], vf[3], point);
    };

    /**
     *
     * @param node2
     * @returns {*}
     */
    BaseNode.prototype.isIntersect = function (node2) {
        var node1 = this;

        if (node2 instanceof BaseNode) {
            return checkBoxIntersect(node1, node2);
        } else if (node2 instanceof Array && node2.length > 0 && node2[0] instanceof BaseNode) {
            for (var i = 0; i < node2.length; i++) {
                if (checkBoxIntersect(node1, node2[i])) return true;
            }
            return false;
        }
    };

    /**
     *
     * @param id
     * @returns {boolean}
     */
    BaseNode.prototype.isCollision = function (id) {
        var result = false;
        if (
            (this.getDistanceXY(id).x < (this.size.x / 2 + id.size.x / 2)) &&
            (this.getDistanceXY(id).y < (this.size.y / 2 + id.size.y / 2))
        ) {
            result = true;
        }
        return result;
    };

    /**
     *
     * @returns {boolean}
     */
    BaseNode.prototype.isLookScene = function () {
        return !((this.pos.x > j2Ds.scene.view.pos.x + j2Ds.scene.width || this.pos.x + this.size.x < j2Ds.scene.view.pos.x)
        || (this.pos.y > j2Ds.scene.view.pos.y + j2Ds.scene.height || this.pos.y + this.size.y < j2Ds.scene.view.pos.y));
    };

    /**
     *
     * @param angle
     */
    BaseNode.prototype.turn = function (angle) {
        this.angle = (this.angle % 360);
        this.angle += angle;
    };

    /**
     *
     * @param angle
     */
    BaseNode.prototype.setRotation = function (angle) {
        this.angle = angle % 360;
    };

    /**
     *
     * @returns {number|*}
     */
    BaseNode.prototype.getRotation = function () {
        return this.angle;
    };

    /**
     *
     * @param to
     * @param t
     */
    BaseNode.prototype.rotateTo = function (to, t) {
        t = t ? t : 1;
        this.setRotation((Math.atan2(
                (to.y - this.getPosition().y),
                (to.x - this.getPosition().x)
            ) * (180 / Math.PI)) / t);
    };

    /**
     *
     * @returns {{}}
     */
    BaseNode.prototype.isOutScene = function () {
        var vector = {};

        if (this.pos.x + this.size.x >= j2Ds.scene.view.pos.x + j2Ds.scene.width) {
            vector.x = 1;
        } else if (this.pos.x <= j2Ds.scene.view.pos.x) {
            vector.x = -1;
        } else {
            vector.x = 0;
        }

        if (this.pos.y + this.size.y >= j2Ds.scene.view.pos.y + j2Ds.scene.height) {
            vector.y = 1;
        } else if (this.pos.y <= j2Ds.scene.view.pos.y) {
            vector.y = -1;
        } else {
            vector.y = 0;
        }

        vector.all = (vector.x || vector.y);

        return vector;
    };

    /**
     *
     * @param speed
     */
    BaseNode.prototype.moveDir = function (speed) {
        this.pos.x += speed * (Math.cos(MathUtil.rad(this.angle)));
        this.pos.y += speed * (Math.sin(MathUtil.rad(this.angle)));
    };

    /**
     *
     */
    BaseNode.prototype.drawBox = function () {
        var context = this.layer.context;

        context.lineWidth = 2;
        context.strokeStyle = 'black';

        if (this.angle) {
            context.save();
            context.translate(
                this.getPosition().x - j2Ds.scene.view.pos.x,
                this.getPosition().y - j2Ds.scene.view.pos.y
            );
            context.rotate(MathUtil.rad(this.angle));
            context.translate(
                -(this.getPosition().x - j2Ds.scene.view.pos.x),
                -(this.getPosition().y - j2Ds.scene.view.pos.y)
            );
        }

        context.beginPath();
        context.rect(
            this.pos.x - j2Ds.scene.view.pos.x,
            this.pos.y - j2Ds.scene.view.pos.y,
            this.size.x, this.size.y);
        context.stroke();

        if (this.angle) {
            context.restore();
            context.save();
            context.translate(
                this.box.offset.x + this.box.size.x / 2 + this.getPosition().x - j2Ds.scene.view.pos.x,
                this.box.offset.y + this.box.size.y / 2 + this.getPosition().y - j2Ds.scene.view.pos.y
            );
            context.rotate(MathUtil.rad(this.angle));
            context.translate(
                -(this.box.offset.x + this.box.size.x / 2 + this.getPosition().x - j2Ds.scene.view.pos.x),
                -(this.box.offset.y + this.box.size.y / 2 + this.getPosition().y - j2Ds.scene.view.pos.y)
            );
        }

        context.strokeStyle = 'yellow';

        context.beginPath();
        context.rect(
            this.box.offset.x + this.pos.x - j2Ds.scene.view.pos.x,
            this.box.offset.y + this.pos.y - j2Ds.scene.view.pos.y,
            this.box.size.x + this.size.x,
            this.box.size.y + this.size.y);
        context.stroke();

        if (this.angle) {
            context.restore();
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.BaseNode = BaseNode;
    if (global.j2Ds !== undefined) global.modules.nodes.BaseNode = BaseNode;
    return BaseNode;
}));
