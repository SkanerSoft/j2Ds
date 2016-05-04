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

    var BaseNode = function (_j2Ds, pos, size) {
        j2Ds = _j2Ds;
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

    BaseNode.prototype.resizeBox = function (offset, size) {
        this.box.offset = offset;
        this.box.size = size;
    };

    BaseNode.prototype.setLayer = function (layer) {
        this.layer = layer ? j2Ds.layers.layer(layer) : j2Ds.scene;
    };

    BaseNode.prototype.getLayer = function () {
        return this.layer;
    };

    BaseNode.prototype.setVisible = function (visible) {
        this.visible = !!visible;
    };

    BaseNode.prototype.isVisible = function () {
        return this.visible;
    };

    BaseNode.prototype.setAlpha = function (alpha) {
        if (alpha < 0) alpha = 0;
        if (alpha > 1) alpha = 1;
        this.alpha = alpha;
    };

    BaseNode.prototype.getAlpha = function () {
        return this.alpha;
    };

    BaseNode.prototype.moveTo = function (to, t) {
        t = t ? t : 1;
        this.move(MathUtil.v2f(
            ((to.x - this.getPosition().x) / t),
            ((to.y - this.getPosition().y) / t)
        ));
    };

    BaseNode.prototype.setPosition = function (pos) {
        if (pos) {
            this.pos = MathUtil.v2f(pos.x - Math.ceil(this.size.x / 2), pos.y - Math.ceil(this.size.y / 2));
        } else {
            return this.pos;
        }
    };

    BaseNode.prototype.move = function (pos) {
        this.pos.x += pos.x;
        this.pos.y += pos.y;
    };

    BaseNode.prototype.getPosition = function () {
        return MathUtil.v2f(this.pos.x + Math.ceil(this.size.x / 2), this.pos.y + Math.ceil(this.size.y / 2));
    };

    BaseNode.prototype.setSize = function (size) {
        if (size) {
            this.size = size;
        } else {
            return this.size;
        }
    };

    BaseNode.prototype.getSize = function () {
        return this.size;
    };

    BaseNode.prototype.setParent = function (id) {
        this.parent = id;
    };

    BaseNode.prototype.getDistance = function (id) {
        return Math.ceil(Math.sqrt(
                Math.pow(id.getPosition().x - this.getPosition().x, 2) +
                Math.pow(id.getPosition().y - this.getPosition().y, 2)
            )
        );
    };

    BaseNode.prototype.getDistanceXY = function (id) {
        return MathUtil.v2f(Math.abs(id.getPosition().x - this.getPosition().x), Math.abs(id.getPosition().y - this.getPosition().y));
    };

    BaseNode.prototype.getBox = function (node) {
        return {
            x1: node.pos.x + node.box.offset.x,
            x2: node.pos.x + node.box.offset.x + node.size.x + node.box.size.x,
            y1: node.pos.y + node.box.offset.y,
            y2: node.pos.y + node.box.offset.y + node.size.y + node.box.size.y
        }
    };

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

    BaseNode.prototype.isPointInsideBox = function (vf, point) {
        return MathUtil.isPointInRect(vf[0], vf[1], vf[2], vf[3], point);
    };

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

    BaseNode.prototype.isLookScene = function () {
        return !((this.pos.x > j2Ds.scene.view.pos.x + j2Ds.scene.width || this.pos.x + this.size.x < j2Ds.scene.view.pos.x)
        || (this.pos.y > j2Ds.scene.view.pos.y + j2Ds.scene.height || this.pos.y + this.size.y < j2Ds.scene.view.pos.y));
    };

    BaseNode.prototype.turn = function (angle) {
        this.angle = (this.angle % 360);
        this.angle += angle;
    };

    BaseNode.prototype.setRotation = function (angle) {
        this.angle = angle % 360;
    };

    BaseNode.prototype.getRotation = function () {
        return this.angle;
    };

    BaseNode.prototype.rotateTo = function (_to, _t) {
        _t = _t ? _t : 1;
        this.setRotation((Math.atan2(
                (_to.y - this.getPosition().y),
                (_to.x - this.getPosition().x)
            ) * (180 / Math.PI)) / _t);
    };

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

    BaseNode.prototype.moveDir = function (speed) {
        this.pos.x += speed * (Math.cos(MathUtil.rad(this.angle)));
        this.pos.y += speed * (Math.sin(MathUtil.rad(this.angle)));
    };

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
