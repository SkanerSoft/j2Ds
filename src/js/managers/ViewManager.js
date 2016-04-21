/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/ViewManager', ['utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('utils/MathUtil'));
    } else {
        factory(root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (MathUtil) {
    "use strict";

    var ViewManager = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.views = {};
    };

    ViewManager.prototype.add = function (id, pos) {
        var viewManager = this;
        var viewport = {
            focusNode: false
        };

        viewport.pos = pos ? MathUtil.v2f(pos.x, pos.y) : MathUtil.v2f(0, 0);

        viewport.setPosition = function (pos) {
            if (!pos) return this;
            this.pos = MathUtil.v2f(pos.x - viewManager.j2Ds.scene.width / 2, pos.y - viewManager.j2Ds.scene.height / 2);
        };

        viewport.getPosition = function () {
            return this.pos;
        };

        viewport.move = function (pos) {
            this.pos.x += pos.x;
            this.pos.y += pos.y;
        };

        viewManager.j2Ds.viewManager.views[id] = viewport;
        return viewport;
    };

    ViewManager.prototype.get = function (id) {
        return this.j2Ds.viewManager.views[id];
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.ViewManager = ViewManager;
    if (global.j2Ds !== undefined) global.modules.managers.ViewManager = ViewManager;
    return ViewManager;
}));
