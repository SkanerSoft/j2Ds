/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('core/Dom', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    /*----------- DOM ---------------*/
    var Dom = function (j2Ds) {
        this.j2Ds = j2Ds;
    };

    Dom.prototype.id = function (id) {
        return document.getElementById(id);
    };

    Dom.prototype.name = function (id) {
        return document.getElementsByName(id)[0];
    };

    Dom.prototype.tag = function (id, parent) {
        var finder = parent || document;
        return finder.getElementsByTagName(id);
    };

    Dom.prototype.goURL = function (url) {
        document.location.href = url;
    };

    Dom.prototype.reloadURL = function () {
        document.location.href = document.location.href;
    };

    Dom.prototype.attach = function (id, parent) {
        var dom = this;
        this.j2Ds.events.addEvent('dom:loaded', function (parent) {
            if (!parent) {
                dom.tag('body')[0].appendChild(id);
            } else {
                dom.id(parent).appendChild(id);
            }
        });
    };

    Dom.prototype.injectJavaScript = function (code) {
        code = code.toString();
        code = code.replace(/[\n\r\t]/g, ';');
        document.location.href = 'javascript: var injectFunction = (function() {setTimeout(' + code + ', 0);}); injectFunction();';
    };

    Dom.prototype.callJava = function (code) {
        document.location.href = 'javacall:' + code;
    };

    Dom.prototype.send = function (path, callback) {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', path, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    callback(ajax.responseText);
                }
            }
        };
        ajax.send(null);
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Dom = Dom;
    if (global.j2Ds !== undefined) global.modules.core.Dom = Dom;
    return Dom;
}));
