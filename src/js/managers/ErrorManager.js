/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('managers/ErrorManager', [], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(typeof window !== 'undefined' ? window : global, function () {
    "use strict";

    var ErrorManager = function (j2Ds) {
        this.j2Ds = j2Ds;
        this.mode = 'neverShow'; // values: onlyShow|stopAndShow|neverShow
        this.enabled = false;
    };

    ErrorManager.prototype.init = function (_true) {
        var errorManager = this;
        errorManager.enabled = _true || true;

        var runBtn = document.createElement('div');
        runBtn.innerHTML = '<b>RUN</b>';
        runBtn.style.padding = '5px';
        runBtn.align = 'center';
        runBtn.style.position = 'fixed';
        runBtn.style.zIndex = 20000;
        runBtn.style.left = '0px';
        runBtn.style.top = -20 + errorManager.j2Ds.getDeviceManager().height + 'px';
        runBtn.style.fontSize = '8pt';
        runBtn.style.backgroundColor = '#B8FFB8';
        runBtn.style.height = '12px';
        runBtn.style.width = '50px';
        runBtn.style.cursor = 'pointer';

        runBtn.onmousedown = function (e) {
            e.stopPropagation();
        };

        runBtn.onclick = function (e) {
            e.stopPropagation();
            errorManager.show('Выполнение продолжено');
            errorManager.j2Ds.runEngine(errorManager.j2Ds);
            return false;
        };

        errorManager.j2Ds.dom.attach(runBtn);
        errorManager.logListener.elems.push(runBtn);


        var pauseBtn = document.createElement('div');
        pauseBtn.innerHTML = '<b>PAUSE</b>';
        pauseBtn.style.padding = '5px';
        pauseBtn.align = 'center';
        pauseBtn.style.position = 'fixed';
        pauseBtn.style.zIndex = 20000;
        pauseBtn.style.left = '60px';
        pauseBtn.style.top = -20 + errorManager.j2Ds.getDeviceManager().height + 'px';
        pauseBtn.style.fontSize = '8pt';
        pauseBtn.style.backgroundColor = '#FFFFBD';
        pauseBtn.style.height = '12px';
        pauseBtn.style.width = '50px';
        pauseBtn.style.cursor = 'pointer';

        pauseBtn.onmousedown = function (e) {
            e.stopPropagation();
        };

        pauseBtn.onclick = function (e) {
            e.stopPropagation();
            errorManager.show('Выполнение приостановлено');
            errorManager.j2Ds.stopEngine();
            return false;
        };

        errorManager.j2Ds.dom.attach(pauseBtn);
        errorManager.logListener.elems.push(pauseBtn);

        var reloadBtn = document.createElement('div');
        reloadBtn.innerHTML = '<b>RELOAD</b>';
        reloadBtn.style.padding = '5px';
        reloadBtn.align = 'center';
        reloadBtn.style.position = 'fixed';
        reloadBtn.style.zIndex = 20000;
        reloadBtn.style.left = '120px';
        reloadBtn.style.top = -20 + errorManager.j2Ds.getDeviceManager().height + 'px';
        reloadBtn.style.fontSize = '8pt';
        reloadBtn.style.backgroundColor = '#E2E2E2';
        reloadBtn.style.color = 'black';
        reloadBtn.style.height = '12px';
        reloadBtn.style.width = '50px';
        reloadBtn.style.cursor = 'pointer';

        reloadBtn.onmousedown = function (e) {
            e.stopPropagation();
        };

        reloadBtn.onclick = function (e) {
            e.stopPropagation();
            errorManager.j2Ds.dom.reloadURL();
            return false;
        };

        errorManager.j2Ds.dom.attach(reloadBtn);
        errorManager.logListener.elems.push(reloadBtn);

        errorManager.j2Ds.events.addEvent('dom:loaded', function () {
            errorManager.j2Ds.window.onerror = function (e) {
                errorManager.show(e);
            };
        });
    };

    ErrorManager.prototype.show = function (string) {
        console.log('[j2Ds]: ' + string);
    };

    ErrorManager.prototype.setMode = function (mode) {
        this.mode = mode;
        if (mode == 'neverShow') {
            this.enabled = false;
        }
    };

    ErrorManager.prototype.debug = function (string) {
        if (!this.enabled) return;
        this.j2Ds.stopEngine();
        if (this.mode != 'neverShow') {
            this.show(string || 'Точка останова достигнута');
        }
    };

    ErrorManager.prototype.showError = function (err, _func) {
        if (this.mode == 'neverShow') return;

        var stack = err.stack.toString();
        stack = stack.split(/\n/);

        for (var i = 0, len = stack.length; i < len; i += 1) {
            if (stack[i].match(/\:\d/)) {
                stack = stack[i].split(/\s/);
                break;
            }
        }

        stack = stack[stack.length - 1];
        stack = stack.replace(/([\(\)]|[\w]+:\/\/)/g, '');
        var file = stack.split(':'),
            line = file[1],
            number = file[2];
        file = decodeURI(file[0]);

        if (file.match(/(<anonymous>|\bj2Ds.js)/)) {
            file = '<Функция-аргумент или строка>';
        }

        var errMess = 'Тип ошибки: "' + err.name + '"' +
            '\nСообщение: "' + err.message + '"' +
            '\nФайл с ошибкой: "' + file + '"' +
            '\nСтрока: ' + line +
            ', символ: ' + number;

        if (_func) {
            errMess += '\nОшибка в теле функции: \n' + _func.toString();
        }

        this.show(errMess);

        if (this.mode == 'stopAndShow') {
            this.j2Ds.stopEngine();
            this.show('Выполнение приостановлено');
        }

    };

    ErrorManager.prototype.logListener = {
        domId: '',
        count: 0,
        execLine: '',
        elems: []
    };

    ErrorManager.prototype.lightSyntax = function (_code, _type) {
        var code = ('' + _code).toString();

        if (_type == 'boolean') {
            code = code.replace(/true/gi, '<b style="color: #12D400;">$&</b>')
                .replace(/false/gi, '<b style="color: #FF4444;">$&</b>');
        } else if (_type == 'code') {
            code = code.replace(/(this|var|typeof|new|return|if|else|for|in|while|break|do|continue|switch|case)([^a-z0-9\$_])/gi,
                '<span style="color: #FFC0CB;"><b>$1</b></span>$2')
                .replace(/(function|object)/gi,
                    '<span style="color: #FFA500;">$1</span>')
                .replace(/(width|height|window|document|scene|j2Ds|value)/gi,
                    '<span style="color: #59B5C0;">$1</span>')
                .replace(/([a-z\_\$][a-z0-9_]*)\(/gi, '<span style="color: #FFCD70;">$1</span>(')
                .replace(/(\{|\}|\]|\[|\|)/gi, '<span style="color: #FFFF00;">$1</span>')
                .replace(/('.*?')/g, '<span style="color: #8FFF8F;">$1</span>')
                .replace(/(#[a-z0-9]{3,8};)/, '<b style="color: red;">$1</b>')
                .replace(/(\t)/g, '&nbsp;&nbsp;');

            code = code.replace(/true/gi, '<b style="color: #12D400;">$&</b>')
                .replace(/false/gi, '<b style="color: #FF4444;">$&</b>');
        }

        return code;
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.ErrorManager = ErrorManager;
    if (global.j2Ds !== undefined) global.modules.managers.ErrorManager = ErrorManager;
    return ErrorManager;
}));
