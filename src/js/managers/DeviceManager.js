/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/DeviceManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var DeviceManager = function () {
        return {
            width: (parseInt(document.documentElement.clientWidth) < parseInt(screen.width))
                ? parseInt(document.documentElement.clientWidth)
                : parseInt(screen.width),
            height: (parseInt(document.documentElement.clientHeight) < parseInt(screen.height))
                ? parseInt(document.documentElement.clientHeight)
                : parseInt(screen.height)
        };
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.DeviceManager = DeviceManager;
    if (global.j2Ds !== undefined) global.modules.managers.DeviceManager = DeviceManager;
    return DeviceManager;
}));
