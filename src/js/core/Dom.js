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

    Dom.prototype.id = function (_id) {
        return document.getElementById(_id);
    };

    Dom.prototype.name = function (_id) {
        return document.getElementsByName(_id)[0];
    };

    Dom.prototype.tag = function (_id, _parent) {
        var finder = _parent || document;
        return finder.getElementsByTagName(_id);
    };

    Dom.prototype.goURL = function (_url) {
        document.location.href = _url;
    };

    Dom.prototype.reloadURL = function () {
        document.location.href = document.location.href;
    };

    Dom.prototype.attach = function (_id, _parent) {
        var dom = this;
        this.j2Ds.events.addEvent('dom:loaded', function (_parent) {
            if (!_parent) {
                dom.tag('body')[0].appendChild(_id);
            } else {
                dom.id(_parent).appendChild(_id);
            }
        });
    };

    Dom.prototype.injectJavaScript = function (_code) {
        var code = _code.toString();
        code = code.replace(/[\n\r\t]/g, ';');
        document.location.href = 'javascript: var injectFunction = (function() {setTimeout(' + code + ', 0);}); injectFunction();';
    };

    Dom.prototype.callJava = function (_code) {
        document.location.href = 'javacall:' + _code;
    };

    Dom.prototype.send = function (_path, _func) {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', _path, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    _func(ajax.responseText);
                }
            }
        };
        ajax.send(null);
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Dom = Dom;
    if (global.j2Ds !== undefined) global.modules.core.Dom = Dom;
    return Dom;
}));
