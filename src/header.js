/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.5
 */

if (global === undefined) {
    var global = window || this;
}
if (typeof define !== 'function' || !define.amd) {
    global.j2Ds = {};
    global.modules = {
        core: {},
        io: {},
        managers: {},
        nodes: {},
        utils: {}
    };
}
