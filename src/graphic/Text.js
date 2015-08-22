/**
 * Text element
 * @module zrender/graphic/Text
 *
 * TODO Wrapping
 */

define(function (require) {

    var Displayable = require('./Displayable');
    var zrUtil = require('../core/util');
    var textContain = require('../contain/text');

    /**
     * @alias zrender/graphic/Text
     * @extends module:zrender/graphic/Displayable
     * @constructor
     * @param {Object} opts
     */
    var Text = function (opts) {
        Displayable.call(this, opts);
    };

    Text.prototype = {

        constructor: Text,

        type: 'text',

        brush: function (ctx) {

            this.beforeBrush(ctx);

            var style = this.style;
            style.textPosition = [0, 0];

            if (style.text) {
                this.drawRectText(ctx, {
                    x: style.x || 0, y: style.y || 0,
                    width: 0, height: 0
                }, this.getBoundingRect());
            }

            this.afterBrush(ctx);
        },

        getBoundingRect: function () {
            if (! this._rect) {
                var style = this.style;
                this._rect = textContain.getBoundingRect(
                    style.text, style.textFont, style.textAlign, style.textBaseline
                );
            }
            return this._rect;
        }
    };

    zrUtil.inherits(Text, Displayable);

    return Text;
});