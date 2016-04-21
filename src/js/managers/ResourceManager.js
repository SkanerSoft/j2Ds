/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/ResourceManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var ResourceManager = function (j2Ds) {
        this.j2Ds = j2Ds;

        this.added = 0;
        this.loaded = 0;
        this.failed = 0;

        this.add = function () {
            this.added += 1;
        };

        this.ok = function (file) {
            this.loaded += 1;
            this.j2Ds.errorManager.show('loaded: "' + decodeURI(file));
        };

        this.fail = function (file) {
            this.failed += 1;
            this.j2Ds.errorManager.show('error load: "' + decodeURI(file));
        };

        this.show = function () {
            return {'added': this.added, 'loaded': this.loaded, 'failed': this.failed};
        };

        this.isLoaded = function () {
            return this.added == this.loaded;
        };

        this.getProgress = function () {
            return Math.ceil(this.loaded / this.added * 100);
        };
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.ResourceManager = ResourceManager;
    if (global.j2Ds !== undefined) global.modules.managers.ResourceManager = ResourceManager;
    return ResourceManager;
}));
