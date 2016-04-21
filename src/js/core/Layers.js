/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('core/Layers', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var Layers = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.layersList = {};
    };

    Layers.prototype.layer = function (id) {
        return this.layersList[id];
    };

    Layers.prototype.add = function (id, index, notDOM) {
        if (!!this.layersList[id]) return false;

        var layer = {
            layerName: id
        };

        if (!notDOM) {
            layer.canvas = document.createElement('canvas');
        } else {
            layer.canvas = this.j2Ds.dom.id(id);
        }

        layer.canvas.style.position = this.j2Ds.scene.stylePosition;

        layer.canvas.id = id;

        layer.canvas.style.zIndex = 1000 + index;
        layer.canvas.style.left = this.j2Ds.scene.offsetLeft + 'px';
        layer.canvas.style.top = this.j2Ds.scene.offsetTop + 'px';

        layer.canvas.width = this.j2Ds.scene.width;
        layer.canvas.height = this.j2Ds.scene.height;
        layer.width = this.j2Ds.scene.width;
        layer.height = this.j2Ds.scene.height;
        layer.context = layer.canvas.getContext('2d');
        layer.context.shadowColor = 'rgba(0,0,0,0)';
        layer.alpha = 1;
        layer.angle = 0;
        layer.visible = 1;

        layer.onContext = function (callback) {
            callback(this.context);
        };

        layer.fill = function (color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.width, this.height);
        };

        layer.setAlpha = function (alpha) {
            this.canvas.style.opacity = alpha;
            this.alpha = alpha;
        };

        layer.getAlpha = function () {
            return this.alpha;
        };

        layer.setVisible = function (visible) {
            if (visible) {
                this.canvas.style.display = 'block';
                this.visible = true;
            } else {
                this.canvas.style.display = 'none';
                this.visible = false;
            }
        };

        layer.isVisible = function () {
            return this.visible;
        };

        layer.setIndex = function (index) {
            this.canvas.style.zIndex = 1000 + index;
        };

        layer.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };

        layer.clearNode = function (node) {
            var layer = this;
            if (node.isLookScene()) {
                this.context.clearRect(
                    node.pos.x - layer.j2Ds.scene.view.pos.x,
                    node.pos.y - layer.j2Ds.scene.view.pos.y,
                    node.size.x,
                    node.size.y
                );
            }
        };

        layer.setContextSettings = function (settings) {
            for (var i in settings) {
                if (typeof this.context[i] !== 'undefined') {
                    this.context[i] = settings[i];
                }
            }
        };

        layer.clearRect = function (pos, size) {
            var layer = this;
            this.context.clearRect(pos.x - layer.j2Ds.scene.view.pos.x, pos.y - layer.j2Ds.scene.view.pos.y, size.x, size.y);
        };

        this.layersList[id] = layer;

        if (!notDOM) {
            this.j2Ds.dom.attach(this.layersList[id].canvas);
        }

        return layer;
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Layers = Layers;
    if (global.j2Ds !== undefined) global.modules.core.Layers = Layers;
    return Layers;
}));
