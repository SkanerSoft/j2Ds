/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2-dev
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('io/InputHandler', ['utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('utils/MathUtil'));
    } else {
        factory(root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (MathUtil) {
    "use strict";

    var InputHandler = function (j2Ds) {
        this.j2Ds = j2Ds;

        this.pos = {x: 0, y: 0};
        this.x = 0;
        this.y = 0;
        this.screenPos = {x: 0, y: 0};
        this.keyDown = [];
        this.keyPress = [];
        this.keyPressed = [];
        this.keyUp = [];
        this.keyUped = false;
        this.mouseDown = [];
        this.mousePress = [];
        this.mousePressed = [];
        this.mouseUp = [];
        this.mouseUpped = false;
        this.mouseWheel = 0;
        this.canceled = false;
        this.body = false;
        this.anyKey = false;
        this.anyMouse = false;
        this.writeMode = false;
        this.displayCursor = '';
        this.visible = true;
        this.enabled = false;
    };

    InputHandler.prototype.mKey = {
        'LEFT': 1,
        'MIDDLE': 2,
        'RIGHT': 3
    };

    InputHandler.prototype.jKey = {
        'LEFT': 37,
        'RIGHT': 39,
        'UP': 38,
        'DOWN': 40,
        'SPACE': 32,
        'CTRL': 17,
        'SHIFT': 16,
        'ALT': 18,
        'ESC': 27,
        'ENTER': 13,
        'MINUS': 189,
        'PLUS': 187,
        'CAPS_LOCK': 20,
        'BACKSPACE': 8,
        'TAB': 9,
        'Q': 81,
        'W': 87,
        'E': 69,
        'R': 82,
        'T': 84,
        'Y': 89,
        'U': 85,
        'I': 73,
        'O': 79,
        'P': 80,
        'A': 65,
        'S': 83,
        'D': 68,
        'F': 70,
        'G': 71,
        'H': 72,
        'J': 74,
        'K': 75,
        'L': 76,
        'Z': 90,
        'X': 88,
        'V': 86,
        'B': 66,
        'N': 78,
        'M': 77,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        'C': 67,
        '9': 57,
        'NUM_0': 45,
        'NUM_1': 35,
        'NUM_2': 40,
        'NUM_3': 34,
        'NUM_4': 37,
        'NUM_5': 12,
        'NUM_6': 39,
        'NUM_7': 36,
        'NUM_8': 38,
        'NUM_9': 33,
        'NUM_MINUS': 109,
        'NUM_PLUS': 107,
        'NUM_LOCK': 144,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123
    };

    InputHandler.prototype.keyList = function () {
        var o = [];
        for (var i in this.jKey) {
            o.push(i);
        }
        return o;
    };

    InputHandler.prototype.reset = function () {
        if (!this.enabled) return false;
        this.keyPress = [];
        this.keyUp = [];
        this.mousePress = [];
        this.mouseUp = [];
        this.mouseWheel = 0;
    };

    InputHandler.prototype.isKeyDown = function (code) {
        return this.keyDown[this.jKey[code]];
    };

    InputHandler.prototype.isKeyPress = function (code) {
        return this.keyPress[this.jKey[code]];
    };

    InputHandler.prototype.isKeyUp = function (code) {
        return this.keyUp[this.jKey[code]];
    };

    InputHandler.prototype.getPosition = function () {
        return MathUtil.v2f(this.pos.x, this.pos.y);
    };

    InputHandler.prototype.getScreenPosition = function () {
        return MathUtil.v2f(this.screenPos.x, this.screenPos.y);
    };

    InputHandler.prototype.setWriteMode = function (_true) {
        this.writeMode = _true;
    };

    InputHandler.prototype.isWriteMode = function () {
        return this.writeMode;
    };

    InputHandler.prototype.keyEvent = function (e) {
        if (!this.enabled) return false;
        if (e.type == 'keydown') {
            if (!this.keyPressed[e.keyCode]) {
                this.keyPress[e.keyCode] = true;
                this.keyPressed[e.keyCode] = true;
            }
            if (!this.writeMode) {
                e.preventDefault();
            } else {
                this.j2Ds.events.onEvent('writeMode:keyPress', '');
            }
        } else if (e.type == 'keyup') {
            if (this.keyPressed[e.keyCode]) {
                e.preventDefault();
                this.keyPress[e.keyCode] = false;
                this.keyPressed[e.keyCode] = false;
                this.keyUp[e.keyCode] = true;
                this.keyUped = true;
            }
        } else if (e.type == 'keypress' && (this.writeMode)) {
            var char = '';
            if (e.which != 0 && e.charCode != 0) {
                if (e.which >= 32) {
                    char = String.fromCharCode(e.which);
                }
            }
            this.j2Ds.events.onEvent('writeMode:keyPress', char);
        }

        this.keyDown[e.keyCode] = (e.type == 'keydown') && (!this.canceled);
        this.anyKey = e.keyCode;
        return false;
    };

    InputHandler.prototype.cancel = function (id) {
        if (!id) {
            this.canceled = true;
            this.keyDown = [];
            this.mouseDown = [];
        }
        else {
            this.keyDown[this.jKey[id]] = false;
        }
    };

    InputHandler.prototype.onNode = function (id) {
        if (!id.layer.visible) return false;
        return (this.pos.x > id.pos.x && this.pos.x < id.pos.x + id.size.x) &&
            (this.pos.y > id.pos.y && this.pos.y < id.pos.y + id.size.y);
    };

    InputHandler.prototype.upd = function () {
        if (!this.enabled) return false;
        var dX = this.j2Ds.scene.offsetWidth / this.j2Ds.scene.width;
        var dY = this.j2Ds.scene.offsetHeight / this.j2Ds.scene.height;
        this.x = (this.screenPos.x / dX);
        this.y = (this.screenPos.y / dY);
        this.pos.x = this.j2Ds.scene.view.pos.x + this.x;
        this.pos.y = this.j2Ds.scene.view.pos.y + this.y;
    };

    InputHandler.prototype.onMove = function (e) {
        this.screenPos.x = -this.j2Ds.scene.offsetLeft + e.pageX;
        this.screenPos.y = -this.j2Ds.scene.offsetTop + e.pageY;
    };

    InputHandler.prototype.isMouseDown = function (code) {
        return this.mouseDown[this.mKey[code]];
    };

    InputHandler.prototype.isMousePress = function (code) {
        return this.mousePress[this.mKey[code]];
    };

    InputHandler.prototype.isMouseUp = function (code) {
        return this.mouseUp[this.mKey[code]];
    };

    InputHandler.prototype.isMouseWheel = function (code) {
        return (code == 'UP' && this.mouseWheel > 0) ||
            (code == 'DOWN' && this.mouseWheel < 0)
    };

    InputHandler.prototype.onMouseWheel = function (e) {
        if (!this.enabled) return false;
        e.preventDefault();
        this.mouseWheel = ((e.wheelDelta) ? e.wheelDelta : -e.detail);
        return false;
    };

    InputHandler.prototype.onMouseEvent = function (e) {
        if (!this.enabled) return false;
        e.preventDefault();
        if (!e.which && e.button) {
            if (e.button & 1) e.which = 1;
            else if (e.button & 4) e.which = 2;
            else if (e.button & 2) e.which = 3;
        }

        if (e.type == 'mousedown') {
            if (!this.mousePressed[e.which]) {
                this.mousePress[e.which] = true;
                this.mousePressed[e.which] = true;
            }
        } else if (e.type == 'mouseup') {
            if (this.mousePressed[e.which]) {
                this.mousePress[e.which] = false;
                this.mousePressed[e.which] = false;
                this.mouseUp[e.which] = true;
                this.mouseUped = true;
            }
        }

        this.mouseDown[e.which] = (e.type == 'mousedown') && (!this.canceled);

        this.j2Ds.window.focus();
        return false;
    };

    InputHandler.prototype.setCursorImage = function (curImg) {
        this.j2Ds.dom.tag('body')[0].style.cursor = 'url("' + curImg + '"), auto';
    };

    InputHandler.prototype.setVisible = function (_true) {
        this.visible = _true;
        if (!_true) {
            this.displayCursor = this.j2Ds.dom.tag('body')[0].style.cursor;
            this.j2Ds.dom.tag('body')[0].style.cursor = 'none';
        } else {
            this.j2Ds.dom.tag('body')[0].style.cursor = this.displayCursor;
        }
    };

    InputHandler.prototype.isVisible = function () {
        return this.visible;
    };

    InputHandler.prototype.init = function () {
        var input = this;
        input.enabled = true;

        input.j2Ds.events.addEvent('engine:before', function () {
            input.upd();
        });

        input.j2Ds.events.addEvent('engine:after', function () {
            input.reset();
        });


        input.j2Ds.events.addEvent('dom:loaded', function () {
            input.j2Ds.window.oncontextmenu = function () {
                return false;
            };
            input.j2Ds.window.onselectstart = input.j2Ds.window.oncontextmenu;
            input.j2Ds.window.ondragstart = input.j2Ds.window.oncontextmenu;
            input.j2Ds.window.onmousedown = input.onMouseEvent;
            input.j2Ds.window.onmouseup = function (e) {
                input.canceled = false;
                input.onMouseEvent(e);
            };
            input.j2Ds.window.onmousemove = function (e) {
                input.onMove(e);
            };
            input.j2Ds.window.onkeydown = function (e) {
                input.keyEvent(e);
            };
            input.j2Ds.window.onkeyup = function (e) {
                input.canceled = false;
                input.keyEvent(e);
            };
            input.j2Ds.window.onkeypress = function (e) {
                input.keyEvent(e);
            };
            input.j2Ds.window.onmousewheel = function (e) {
                input.onMouseWheel(e);
            };

            if (input.j2Ds.window.addEventListener) {
                input.j2Ds.window.addEventListener("DOMMouseScroll", function (e) {
                    input.onMouseWheel(e);
                }, false);
            }
        });
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.InputHandler = InputHandler;
    if (global.j2Ds !== undefined) global.modules.io.InputHandler = InputHandler;
    return InputHandler;
}));
