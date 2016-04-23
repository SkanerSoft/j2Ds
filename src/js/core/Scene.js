/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('core/Scene', [
            'nodes/BaseNode',
            'nodes/CircleNode',
            'nodes/LineNode',
            'nodes/RectNode',
            'nodes/SpriteNode',
            'nodes/TextNode',
            'utils/TextureUtil'
        ], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(
            require('nodes/BaseNode'),
            require('nodes/CircleNode'),
            require('nodes/LineNode'),
            require('nodes/RectNode'),
            require('nodes/SpriteNode'),
            require('nodes/TextNode'),
            require('utils/TextureUtil')
        );
    } else {
        factory(
            root.modules.nodes.BaseNode,
            root.modules.nodes.CircleNode,
            root.modules.nodes.LineNode,
            root.modules.nodes.RectNode,
            root.modules.nodes.SpriteNode,
            root.modules.nodes.TextNode,
            root.modules.utils.TextureUtil
        );
    }
}(typeof window !== 'undefined' ? window : global,
    function (BaseNode,
              CircleNode,
              LineNode,
              RectNode,
              SpriteNode,
              TextNode,
              TextureUtil) {
        "use strict";

        var Scene = function (j2Ds) {
            j2Ds = this.j2Ds = j2Ds;

            this.nodes = [];
            this.layerName = 'sceneNode';
            this.stylePosition = 'fixed';
            this.layers = j2Ds.layers;
            this.view = false;
            this.gameStateName = false;
            this.canFullScreen = true;

            this.texture = new TextureUtil(this.j2Ds);
        };

        /*функции*/

        Scene.prototype.setView = function (id) {
            this.view = this.j2Ds.viewManager.views[id];
        };

        Scene.prototype.getView = function () {
            return this.view;
        };

        Scene.prototype.setAutoDraw = function (toggle) {
            var scene = this;
            if (toggle) {
                scene.j2Ds.events.addEvent('engine:after', function () {
                    scene.drawAllNodes();
                }, 'autoDraw');
            } else {
                scene.j2Ds.events.destroyEvent('engine:after', 'autoDraw');
            }
        };

        Scene.prototype.setAutoClear = function (toggle) {
            var scene = this;
            if (toggle) {
                scene.j2Ds.events.addEvent('engine:before', function () {
                    scene.clear();
                }, 'autoClear');
            } else {
                scene.j2Ds.events.destroyEvent('engine:before', 'autoClear');
            }
        };

        Scene.prototype.setGameState = function (name) {
            if (this.j2Ds.gameStates.states[name].start) {
                this.j2Ds.gameStates.states[name].start();
            }
            if (this.j2Ds.gameStates.states[name].state) {
                this.j2Ds.setActiveEngine(this.j2Ds.gameStates.states[name].state);
            }
            this.gameStateName = name;
            this.j2Ds.events.onEvent('scene:changedGameState');
        };

        Scene.prototype.getGameState = function () {
            return this.gameStateName;
        };

        Scene.prototype.start = function (name, frameLimit) {
            this.j2Ds.events.onEvent('scene:beforeStart');
            if (this.j2Ds.gameStates.states[name].start) {
                this.j2Ds.gameStates.states[name].start();
            }
            if (this.j2Ds.gameStates.states[name]) {
                this.j2Ds.start(this.j2Ds.gameStates.states[name].state, frameLimit);
            }
            this.j2Ds.events.onEvent('scene:afterStart');
        };

        Scene.prototype.fullScreen = function (_true) {
            if (!this.canFullScreen) return;
            var layer;
            var tmpCanvas = document.createElement('canvas'); // Нужны для копирования содержимого
            var tmpContext = tmpCanvas.getContext('2d');      // При изменении размера
            if (_true) {
                this.origWidth = this.width;
                this.origHeight = this.height;
                this.width = this.j2Ds.getDeviceManager().width;
                this.height = this.j2Ds.getDeviceManager().height;
                for (var i in this.j2Ds.layers.layersList) {
                    layer = this.j2Ds.layers.layersList[i];
                    tmpCanvas.width = layer.width;
                    tmpCanvas.height = layer.height;
                    tmpContext.drawImage(layer.canvas, 0, 0);
                    layer.canvas.width = this.width;
                    layer.canvas.height = this.height;
                    layer.width = this.width;
                    layer.height = this.height;
                    this.offsetWidth = this.width;
                    this.offsetHeight = this.height;

                    layer.context.drawImage(tmpCanvas, 0, 0, layer.width, layer.height);
                }
            } else {
                this.width = this.origWidth;
                this.height = this.origHeight;
                for (var i in this.j2Ds.layers.layersList) {
                    layer = this.j2Ds.layers.layersList[i];
                    layer.width = this.origWidth;
                    layer.height = this.origHeight;
                    layer.canvas.width = this.origWidth;
                    layer.canvas.height = this.origHeight;
                    this.offsetWidth = this.origWidth;
                    this.offsetHeight = this.origHeight;

                }
            }
        };

        Scene.prototype.fullScale = function (_true) {
            if (!this.canFullScreen) return;
            var layer;
            if (_true) {
                for (var i in this.j2Ds.layers.layersList) {
                    layer = this.j2Ds.layers.layersList[i].canvas;
                    layer.style.width = this.j2Ds.getDeviceManager().width + 'px';
                    layer.style.height = this.j2Ds.getDeviceManager().height + 'px';
                    this.offsetWidth = this.j2Ds.getDeviceManager().width;
                    this.offsetHeight = this.j2Ds.getDeviceManager().height;
                }
            } else {
                for (var i in this.j2Ds.layers.layersList) {
                    layer = this.j2Ds.layers.layersList[i].canvas;
                    layer.style.width = this.width + 'px';
                    layer.style.height = this.height + 'px';
                    this.offsetWidth = this.width;
                    this.offsetHeight = this.height;
                }
            }
        };

        Scene.prototype.clear = function () {
            this.getLayer().clear();
        };

        Scene.prototype.getLayer = function () {
            return this.j2Ds.layers.layer(this.layerName);
        };

        Scene.prototype.drawAllNodes = function () {
            for (var i = 0, len = this.nodes.length; i < len; i += 1) {
                if (this.nodes[i].draw) {
                    this.nodes[i].draw();
                }
            }
        };

        Scene.prototype.init = function (width, height, canDeactivate) {
            var scene = this;

            scene.j2Ds.events.onEvent('scene:beforeInit');

            scene.width = width;
            scene.height = height;

            scene.origWidth = width;
            scene.origHeight = height;

            scene.offsetWidth = width;
            scene.offsetHeight = height;

            scene.offsetLeft = 0;
            scene.offsetTop = 0;


            scene.j2Ds.canDeactivate = canDeactivate != false;

            scene.j2Ds.layers.add('sceneNode', 0);

            scene.context = scene.j2Ds.layers.layer(scene.layerName).context;
            scene.canvas = scene.j2Ds.layers.layer(scene.layerName).canvas;
            scene.visible = true;

            scene.cancelClear = false;

            /* Вид "камеры" */
            scene.view = scene.j2Ds.viewManager.add('sceneView');

            scene.j2Ds.events.onEvent('scene:afterInit');

            scene.j2Ds.window.onload = function () {

                scene.j2Ds.window.focus();

                scene.j2Ds.window.onblur = function () {
                    if (scene.j2Ds.stopAll == 0) {
                        scene.j2Ds.stopEngine();
                        scene.j2Ds.events.onEvent('scene:deactivate');
                    }
                };

                scene.j2Ds.window.onfocus = function () {
                    if (scene.j2Ds.stopAll == 1) {

                        scene.j2Ds.runEngine(scene.j2Ds);
                        scene.j2Ds.events.onEvent('scene:activate');
                    }
                };

                for (var i in scene.j2Ds.layers.layersList) {
                    scene.j2Ds.dom.attach(scene.j2Ds.layers.layer(i).canvas);
                }

                scene.j2Ds.ready = true;

                scene.j2Ds.events.onEvent('dom:loaded');
            };
        };

        Scene.prototype.initCanvas = function (id, canDeactivate) {
            var scene = this;

            scene.canFullScreen = false;

            scene.layerName = id;

            scene.j2Ds.events.onEvent('scene:beforeInit');

            scene.width = parseInt(scene.j2Ds.dom.id(id).width);
            scene.height = parseInt(scene.j2Ds.dom.id(id).height);

            scene.origWidth = scene.width;
            scene.origHeight = scene.height;

            scene.offsetWidth = parseInt(scene.j2Ds.dom.id(id).offsetWidth);
            scene.offsetHeight = parseInt(scene.j2Ds.dom.id(id).offsetHeight);

            scene.offsetLeft = parseInt(scene.j2Ds.dom.id(id).offsetLeft);
            scene.offsetTop = parseInt(scene.j2Ds.dom.id(id).offsetTop);

            scene.stylePosition = scene.j2Ds.dom.id(id).style.position == 'fixed' ? 'fixed' : 'absolute';

            scene.j2Ds.canDeactivate = canDeactivate != false;

            scene.j2Ds.layers.add(id, 0, 1);

            scene.context = scene.j2Ds.layers.layer(id).context;
            scene.canvas = scene.j2Ds.layers.layer(id).canvas;
            scene.visible = true;

            scene.cancelClear = false;

            /* Вид "камеры" */
            scene.view = scene.j2Ds.viewManager.add('sceneView');

            scene.j2Ds.events.onEvent('scene:afterInit');

            scene.j2Ds.window.onload = function () {

                scene.j2Ds.window.focus();

                scene.j2Ds.window.onblur = function () {
                    if (scene.j2Ds.stopAll == 0) {
                        scene.j2Ds.stopEngine();
                        scene.j2Ds.events.onEvent('scene:deactivate');
                    }
                };

                scene.j2Ds.window.onfocus = function () {
                    if (scene.j2Ds.stopAll == 1) {
                        scene.j2Ds.runEngine(scene.j2Ds);
                        scene.j2Ds.events.onEvent('scene:activate');
                    }
                };

                for (var i in scene.j2Ds.layers.layersList) {
                    scene.j2Ds.dom.attach(scene.j2Ds.layers.layer(i).canvas);
                }

                scene.j2Ds.ready = true;

                scene.j2Ds.events.onEvent('dom:loaded');
            };
        };

        /* Nodes */
        Scene.prototype.addBaseNode = function (pos, size) {
            return new BaseNode(this.j2Ds, pos, size);
        };

        Scene.prototype.addCircleNode = function (pos, radius, color) {
            return new CircleNode(this.j2Ds, pos, radius, color);
        };

        Scene.prototype.addLineNode = function (pos, points, scale, color, width, fill, cFill) {
            return new LineNode(this.j2Ds, pos, points, scale, color, width, fill, cFill);
        };

        Scene.prototype.addRectNode = function (pos, size, color) {
            return new RectNode(this.j2Ds, pos, size, color);
        };

        Scene.prototype.addSpriteNode = function (pos, size, animation) {
            return new SpriteNode(this.j2Ds, pos, size, animation);
        };

        Scene.prototype.addTextNode = function (pos, text, sizePx, color, family, width, colorL) {
            return new TextNode(this.j2Ds, pos, text, sizePx, color, family, width, colorL);
        };

        if (typeof module === 'object' && typeof module.exports === 'object') module.exports.Scene = Scene;
        if (global.j2Ds !== undefined) global.modules.core.Scene = Scene;
        return Scene;
    }));
