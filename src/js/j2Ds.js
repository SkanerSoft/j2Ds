/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.4
 */

/**
 * @module "j2Ds"
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

        /**
         * @class j2DsEngine
         * @exports module:"j2Ds"
         * @alias module:"j2Ds"
         *
         * @constructor
         * @property {number} now
         * @property {number} dt
         * @property {number} stopAll
         * @property {number} frameLimit
         * @property {number} sceneStartTime
         * @property {number} sceneSkipTime
         * @property {function} engine
         * @property {boolean} ready
         * @property {Window} window
         * @property {boolean} canDeactivate
         */
        var j2DsEngine = function () {
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

            /**
             * @method
             * @param {string} id
             * @returns {StorageManager}
             */
            this.createLocal = function (id) {
                return new StorageManager(this, id);
            }
        };

        /* Getters & Setters */
        /**
         * @returns {{name: string, version: string, git: string, site: string, description: string, author: string}}
         */
        j2DsEngine.prototype.getInfo = function () {
            return {
                'name': 'j2Ds',
                'version': '0.6.4',
                'git': 'https://github.com/SkanerSoft/j2Ds',
                'site': 'http://j2ds.ru',
                'description': 'HTML5 2D Game Engine',
                'author': 'Skaner'
            };
        };

        /**
         * @returns {FpsManager}
         */
        j2DsEngine.prototype.getFPSManager = function () {
            this.fpsManager.init();
            return this.fpsManager;
        };

        /**
         * @returns {SceneManager}
         */
        j2DsEngine.prototype.getSceneManager = function () {
            return this.scene;
        };

        /**
         * @returns {Layers}
         */
        j2DsEngine.prototype.getLayerManager = function () {
            return this.layers;
        };

        /**
         * @returns {TextureUtil}
         */
        j2DsEngine.prototype.getTextureManager = function () {
            return this.scene.texture;
        };

        /**
         * @returns {AudioHandler}
         */
        j2DsEngine.prototype.getAudioManager = function () {
            this.audio.init();
            return this.audio;
        };

        /** @deprecated */
        j2DsEngine.prototype.getPaintManager = function () {
            return this.paint;
        };

        /**
         * @returns {InputHandler}
         */
        j2DsEngine.prototype.getIO = function () {
            this.input.init();
            return this.input;
        };

        /**
         * @returns {Dom}
         */
        j2DsEngine.prototype.getDOMManager = function () {
            return this.dom;
        };

        /**
         * @returns {TriggerManager}
         */
        j2DsEngine.prototype.getTriggerManager = function () {
            this.trigger.init();
            return this.trigger;
        };

        /**
         * @returns {MathUtil}
         */
        j2DsEngine.prototype.getMathManager = function () {
            return MathUtil;
        };

        /**
         * @returns {{states: {}, add: j2DsEngine.gameStates.add}}
         */
        j2DsEngine.prototype.getGameStateManager = function () {
            return this.gameStates;
        };

        /**
         * @returns {ViewManager}
         */
        j2DsEngine.prototype.getViewManager = function () {
            return this.viewManager;
        };

        /**
         * @returns {DeviceManager}
         */
        j2DsEngine.prototype.getDeviceManager = function () {
            return this.deviceManager;
        };

        /**
         * @returns {ErrorManager}
         */
        j2DsEngine.prototype.getErrorManager = function () {
            this.errorManager.init();
            return this.errorManager;
        };

        /**
         * @returns {TimeManager}
         */
        j2DsEngine.prototype.getTimeManager = function () {
            return this.timeManager;
        };

        /**
         * @returns {ResourceManager}
         */
        j2DsEngine.prototype.getResourceManager = function () {
            return this.resources;
        };

        /**
         * @param {Window} global
         */
        j2DsEngine.prototype.setWindow = function (global) {
            this.window = global ? global : window;
        };

        /**
         * @param {number} fps
         */
        j2DsEngine.prototype.setFrameLimit = function (fps) {
            this.frameLimit = (fps > 0 && fps <= 60) ? fps : 60;
            frameLimit = this.frameLimit;
        };

        /**
         * @param {function} engine
         */
        j2DsEngine.prototype.setActiveEngine = function (engine) {
            this.engine = typeof engine == 'function'
                ? engine
                : this.errorManager.show('Error in "GameStateManager"');
        };

        /**
         * @type {{states: {}, add: j2DsEngine.gameStates.add}}
         */
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

        /**
         * @param {function} engine
         * @param {number} frameLimit
         */
        j2DsEngine.prototype.start = function (engine, frameLimit) {
            this.setActiveEngine(engine);
            this.frameLimit = frameLimit || 60;
            this.sceneSkipTime = 1000.0 / this.frameLimit;
            this.lastTime = Date.now();
            this.dt = 0;
            this.sceneStartTime = this.lastTime;
            this.gameEngine(this);
        };

        /**
         * @param {j2DsEngine} j2Ds
         */
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

        /**
         *
         */
        j2DsEngine.prototype.stopEngine = function () {
            if (!this.canDeactivate) return;
            this.stopAll = true;
        };

        /**
         * @param {j2DsEngine} j2Ds
         */
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
