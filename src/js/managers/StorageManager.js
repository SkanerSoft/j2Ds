/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/StorageManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var StorageManager = function (j2Ds, id) {
        this.j2Ds = j2Ds;
        this.id = id;
        this.ls = this.j2Ds.window.localStorage ? this.j2Ds.window.localStorage : false;
        if (!this.ls) alert('j2Ds ERROR in "createLocal(' + id + ')" \n' + 'Объект "localStorage" не поддерживается.');
    };

    StorageManager.prototype.saveNode = function (name, o) {
        if (!this.ls) return false;
        this.ls.setItem(this.id + name, JSON.stringify(o));
    };

    StorageManager.prototype.load = function (name) {
        if (!this.ls) {
            return false;
        }
        return this.ls.getItem(this.id + name);
    };

    StorageManager.prototype.is = function (name) {
        if (!this.ls) {
            return false;
        }
        return !!(this.ls.getItem(this.id + name));
    };

    StorageManager.prototype.save = function (name, value) {
        if (!this.ls) {
            return false;
        }
        this.ls.setItem(this.id + name, value);
    };

    StorageManager.prototype.loadNode = function (name) {
        if (!this.ls) {
            return false;
        }
        return JSON.parse(this.ls.getItem(this.id + name));
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.StorageManager = StorageManager;
    if (global.j2Ds !== undefined) global.modules.managers.StorageManager = StorageManager;
    return StorageManager;
}));
