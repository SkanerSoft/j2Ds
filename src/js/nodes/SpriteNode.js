/**
 * j2Ds (HTML5 2D Game Engine)
 *
 * @authors Skaner, DeVinterX
 * @license zlib
 * @version 0.6.2-dev
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('nodes/SpriteNode', ['nodes/BaseNode', 'utils/MathUtil'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('nodes/BaseNode'), require('utils/MathUtil'));
    } else {
        factory(root.modules.nodes.BaseNode, root.modules.utils.MathUtil);
    }
}(typeof window !== 'undefined' ? window : global, function (BaseNode, MathUtil) {
    "use strict";

    var j2Ds;

    var SpriteNode = function (_j2Ds, pos, size, animation) {
        j2Ds = _j2Ds;
        BaseNode.call(this, _j2Ds, pos, size);

        this.tmpSpeed = 0;
        this.frame = 0;
        this.animation = animation;
        this.flip = {x: false, y: false};
    };

    SpriteNode.prototype = Object.create(BaseNode.prototype);
    SpriteNode.prototype.constructor = SpriteNode;

    SpriteNode.prototype.setFlip = function (x, y) {
        this.flip = {x: x, y: y};
    };

    SpriteNode.prototype.draw = function (speed) {
        if (this.visible && this.isLookScene()) {
            speed = speed || 1;

            if (this.frame > this.animation.frameCount) {
                this.frame = 0;
            }
            this.drawFrame(this.frame + 1);

            if (this.tmpSpeed > speed) {
                this.frame += 1;
                this.tmpSpeed = 0;
            }
            else {
                this.tmpSpeed += 1;
            }
        }
    };

    // отрисовка одного кадра
    SpriteNode.prototype.drawFrame = function (frame) {
        if (!this.animation.imageMap.loaded) return (err.show('Invalid ImageMap', 'red'));
        var context = this.layer.context;
        if (this.visible && this.isLookScene()) {

            if (this.alpha != 1) {
                var tmpAlpha = context.globalAlpha;
                context.globalAlpha = this.alpha;
            }

            context.lineWidth = 0;

            if (this.angle || this.flip.x || this.flip.y) {
                context.save();
                context.translate(this.getPosition().x - j2Ds.scene.view.pos.x, this.getPosition().y - j2Ds.scene.view.pos.y);
                context.rotate(MathUtil.rad(this.angle));
                context.scale(this.flip.x ? -1 : 1, this.flip.y ? -1 : 1);
                context.translate(-(this.getPosition().x - j2Ds.scene.view.pos.x), -(this.getPosition().y - j2Ds.scene.view.pos.y));
            }

            frame = frame ? (frame - 1) : 0;

            context.drawImage(
                this.animation.imageMap.img,
                (this.animation.sourceX + (this.animation.sourceW * frame)), this.animation.sourceY,
                this.animation.sourceW, this.animation.sourceH,
                this.pos.x - j2Ds.scene.view.pos.x, this.pos.y - j2Ds.scene.view.pos.y,
                this.size.x, this.size.y);

            if (this.angle || this.flip.x || this.flip.y) {
                context.restore();
            }

            if (this.alpha != 1) {
                context.globalAlpha = tmpAlpha;
            }
        }
    };

    SpriteNode.prototype.setAnimation = function (id) {
        if (this.animation != id) {
            this.animation = id;
        }
    };

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.SpriteNode = SpriteNode;
    if (global.j2Ds !== undefined) global.modules.nodes.SpriteNode = SpriteNode;
    return SpriteNode;
}));
