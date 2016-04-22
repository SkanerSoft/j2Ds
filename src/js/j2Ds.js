/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.3
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('j2Ds', [
            'core/Dom',
            'core/Gui',
            'core/Events',
            'core/Layers',
            'core/Scene',

            'io/AudioHandler',
            'io/InputHandler',
            'io/TouchHandler',

            'managers/DeviceManager',
            'managers/ErrorManager',
            'managers/FpsManager',
            'managers/ResourceManager',
            'managers/StorageManager',
            'managers/TimeManager',
            'managers/TriggerManager',
            'managers/ViewManager',

            'utils/MathUtil',
            'utils/TextureUtil'
        ], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(
            require('core/Dom'),
            require('core/Gui'),
            require('core/Events'),
            require('core/Layers'),
            require('core/Scene'),

            require('io/AudioHandler'),
            require('io/InputHandler'),
            require('io/TouchHandler'),

            require('managers/DeviceManager'),
            require('managers/ErrorManager'),
            require('managers/FpsManager'),
            require('managers/ResourceManager'),
            require('managers/StorageManager'),
            require('managers/TimeManager'),
            require('managers/TriggerManager'),
            require('managers/ViewManager'),

            require('utils/MathUtil'),
            require('utils/TextureUtil')
        );
    } else {
        factory(
            root.modules.core.Dom,
            root.modules.core.Gui,
            root.modules.core.Events,
            root.modules.core.Layers,
            root.modules.core.Scene,

            root.modules.io.AudioHandler,
            root.modules.io.InputHandler,
            root.modules.io.TouchHandler,

            root.modules.managers.DeviceManager,
            root.modules.managers.ErrorManager,
            root.modules.managers.FpsManager,
            root.modules.managers.ResourceManager,
            root.modules.managers.StorageManager,
            root.modules.managers.TimeManager,
            root.modules.managers.TriggerManager,
            root.modules.managers.ViewManager,

            root.modules.utils.MathUtil,
            root.modules.utils.TextureUtil
        );
    }
}(typeof window !== 'undefined' ? window : global,
    function (DOM,
              GUI,
              Events,
              Layers,
              Scene,
              AudioHandler,
              InputHandler,
              TouchHandler,
              DeviceManager,
              ErrorManager,
              FPSManager,
              ResourceManager,
              StorageManager,
              TimeManager,
              TriggerManager,
              ViewManager,
              MathUtil) {
        "use strict";

        var frameLimit = 60;

        /*------------------ 2D движок --------------------*/
        var j2DsEngine = function () {
            this.vector = {};
            this.math = {};
            this.dom = {};
            this.now = Date.now();
            this.dt = 0;
            this.stopAll = 0;
            this.frameLimit = 60;
            this.sceneStartTime = 0;
            this.sceneSkipTime = 0;
            this.engine = function () {
                this.errorManager.show('Не инициализировано ни одно игровое состояние', 'red');
                this.stopEngine();
            };
            this.ready = false;
            this.window = window;
            this.canDeactivate = true;

            /* Getters & Setters */

            this.getInfo = function () {
                return {
                    'name': 'j2Ds',
                    'version': '0.6.3',
                    'git': 'https://github.com/SkanerSoft/j2Ds',
                    'site': 'http://j2ds.ru',
                    'description': 'HTML5 2D Game Engine',
                    'author': 'Skaner'
                };
            };

            this.getFPSManager = function () {
                this.fpsManager.init();
                return this.fpsManager;
            };

            this.getSceneManager = function () {
                return this.scene;
            };

            this.getLayerManager = function () {
                return this.layers;
            };

            this.getTextureManager = function () {
                return this.scene.texture;
            };

            this.getAudioManager = function () {
                this.audio.init();
                return this.audio;
            };

            this.getPaintManager = function () {
                return this.paint;
            };

            this.getIO = function () {
                this.input.init();
                return this.input;
            };

            this.getTouchIO = function () {
                this.touch.init();
                return this.touch;
            };

            this.getDOMManager = function () {
                return this.dom;
            };

            this.getTriggerManager = function () {
                this.trigger.init();
                return this.trigger;
            };

            this.getMathManager = function () {
                return MathUtil;
            };

            this.getGameStateManager = function () {
                return this.gameStates;
            };

            this.getViewManager = function () {
                return this.viewManager;
            };

            this.getDeviceManager = function () {
                return this.deviceManager;
            };

            this.getErrorManager = function () {
                this.errorManager.init();
                return this.errorManager;
            };

            this.getTimeManager = function () {
                return this.timeManager;
            };

            this.getResourceManager = function () {
                return this.resources;
            };

            this.setWindow = function (_window) {
                this.window = _window ? _window : window;
            };

            this.setFrameLimit = function (fps) {
                this.frameLimit = (fps > 0 && fps <= 60) ? fps : 60;
                frameLimit = this.frameLimit;
            };

            this.setActiveEngine = function (engine) {
                this.engine = typeof engine == 'function'
                    ? engine
                    : this.errorManager.show('Error in "GameStateManager"');
            };

            this.events = new Events(this);
            this.dom = new DOM(this);
            this.gui = new GUI(this);
            this.resources = new ResourceManager(this);
            this.trigger = new TriggerManager(this);
            this.timeManager = new TimeManager(this);
            this.deviceManager = DeviceManager();
            this.errorManager = new ErrorManager(this);
            this.fpsManager = new FPSManager(this);
            this.input = new InputHandler(this);
            this.layers = new Layers(this);
            this.viewManager = new ViewManager(this);
            this.scene = new Scene(this);

            this.createLocal = function (id) {
                new StorageManager(this, id);
            }
        };

        j2DsEngine.prototype.gameStates = {
            states: {},

            add: function (name, _state, start, end) {
                var state = {};
                state.state = _state;
                state.start = start || false;
                state.end = end || false;

                this.states[name] = state;
            }
        };

        j2DsEngine.prototype.start = function (engine, frameLimit) {
            this.setActiveEngine(engine);
            this.frameLimit = frameLimit || 60;
            this.sceneSkipTime = 1000.0 / this.frameLimit;
            this.lastTime = Date.now();
            this.dt = 0;
            this.sceneStartTime = this.lastTime;
            this.gameEngine(this);
        };

        j2DsEngine.prototype.gameEngine = function (j2Ds) {
            j2Ds.now = Date.now();
            setTimeout(function () {
                if (!j2Ds.stopAll) {
                    j2Ds.dt = (j2Ds.now - j2Ds.lastTime) / 100.0;
                    j2Ds.sceneStartTime = j2Ds.now;
                    if (j2Ds.dt > j2Ds.sceneSkipTime / 2) j2Ds.dt = 0;

                    j2Ds.events.onEvent('engine:before');

                    try {
                        j2Ds.engine();
                    } catch (err) {
                        j2Ds.errorManager.showError(err);
                    }

                    j2Ds.events.onEvent('engine:after');

                    j2Ds.lastTime = j2Ds.now;

                    requestAnimationFrame(function () {
                        j2Ds.gameEngine(j2Ds);
                    });
                }
            }, (j2Ds.frameLimit < 60 ? j2Ds.sceneSkipTime : 0));
        };

        var requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / frameLimit);
                };
        })();

        j2DsEngine.prototype.stopEngine = function () {
            if (!this.canDeactivate) return;
            this.stopAll = true;
        };

        j2DsEngine.prototype.runEngine = function (j2Ds) {
            j2Ds = j2Ds || this;
            if (!j2Ds.canDeactivate) return;
            if (!j2Ds.stopAll) return;
            j2Ds.stopAll = false;
            requestAnimationFrame(function () {
                j2Ds.gameEngine(j2Ds);
            });
        };

        if (typeof module === 'object' && typeof module.exports === 'object') module.exports.j2Ds = j2DsEngine;
        if (global.j2Ds !== undefined) global.modules.core.j2Ds = j2DsEngine;
        if (global.j2Ds !== undefined) global.j2Ds = new j2DsEngine();
        return j2DsEngine;
    }
));
