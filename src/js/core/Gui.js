/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('core/Gui', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    /*----------- GUI ---------------*/
    var Gui = function () {
        this.nodes = {};
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Gui = Gui;
    if (global.j2Ds !== undefined) global.modules.core.Gui = Gui;
    return Gui;
}));
