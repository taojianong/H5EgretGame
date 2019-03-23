var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairui;
(function (fairui) {
    /**
     * 虚线
     * @author cl 2018.4.16
     */
    var DashedLine = (function (_super) {
        __extends(DashedLine, _super);
        function DashedLine(target, onLength, offLength) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this) || this;
            /**
             * A value representing the accuracy used in determining the length
             * of curveTo curves.
             */
            _this._curveaccuracy = 6;
            _this.isLine = true;
            _this.overflow = 0;
            _this.offLength = 0;
            _this.onLength = 0;
            _this.dashLength = 0;
            var g = null;
            if (target instanceof fairygui.GComponent) {
                g = new fairygui.GGraph();
                target.addChild(g);
                _this.target = g.graphics;
            }
            else {
                _this.target = target ? target["graphics"] : _this.graphics;
            }
            _this.setDash(onLength, offLength);
            _this.isLine = true;
            _this.overflow = 0;
            _this.pen = { x: 0, y: 0 };
            return _this;
        }
        /**
         * Sets new lengths for dash sizes
         * @param onLength Length of visible dash lines.
         * @param offLength Length of space between dash lines.
         * @return nothing
         */
        DashedLine.prototype.setDash = function (onLength, offLength) {
            this.onLength = onLength;
            this.offLength = offLength;
            this.dashLength = this.onLength + this.offLength;
        };
        /**
         * Gets the current lengths for dash sizes
         * @return Array containing the onLength and offLength values
         * respectively in that order
         */
        DashedLine.prototype.getDash = function () {
            return [this.onLength, this.offLength];
        };
        /**
         * Moves the current drawing position in target to (x, y).
         * @param x An integer indicating the horizontal position relative to the registration point of
         * the parent movie clip.
         * @param An integer indicating the vertical position relative to the registration point of the
         * parent movie clip.
         * @return nothing
         */
        DashedLine.prototype.moveTo = function (x, y) {
            this.targetMoveTo(x, y);
        };
        /**
         * Draws a dashed line in target using the current line style from the current drawing position
         * to (x, y); the current drawing position is then set to (x, y).
         * @param x An integer indicating the horizontal position relative to the registration point of
         * the parent movie clip.
         * @param An integer indicating the vertical position relative to the registration point of the
         * parent movie clip.
         * @return nothing
         */
        DashedLine.prototype.lineTo = function (x, y) {
            var dx = x - this.pen["x"], dy = y - this.pen["y"];
            var a = Math.atan2(dy, dx);
            var ca = Math.cos(a), sa = Math.sin(a);
            var segLength = this.lineLength(dx, dy);
            if (this.overflow) {
                if (this.overflow > segLength) {
                    if (this.isLine)
                        this.targetLineTo(x, y);
                    else
                        this.targetMoveTo(x, y);
                    this.overflow -= segLength;
                    return;
                }
                if (this.isLine)
                    this.targetLineTo(this.pen["x"] + ca * this.overflow, this.pen["y"] + sa * this.overflow);
                else
                    this.targetMoveTo(this.pen["x"] + ca * this.overflow, this.pen["y"] + sa * this.overflow);
                segLength -= this.overflow;
                this.overflow = 0;
                this.isLine = !this.isLine;
                if (!segLength)
                    return;
            }
            var fullDashCount = Math.floor(segLength / this.dashLength);
            if (fullDashCount) {
                var onx = ca * this.onLength, ony = sa * this.onLength;
                var offx = ca * this.offLength, offy = sa * this.offLength;
                for (var i = 0; i < fullDashCount; i++) {
                    if (this.isLine) {
                        this.targetLineTo(this.pen["x"] + onx, this.pen["y"] + ony);
                        this.targetMoveTo(this.pen["x"] + offx, this.pen["y"] + offy);
                    }
                    else {
                        this.targetMoveTo(this.pen["x"] + offx, this.pen["y"] + offy);
                        this.targetLineTo(this.pen["x"] + onx, this.pen["y"] + ony);
                    }
                }
                segLength -= this.dashLength * fullDashCount;
            }
            if (this.isLine) {
                if (segLength > this.onLength) {
                    this.targetLineTo(this.pen["x"] + ca * this.onLength, this.pen["y"] + sa * this.onLength);
                    this.targetMoveTo(x, y);
                    this.overflow = this.offLength - (segLength - this.onLength);
                    this.isLine = false;
                }
                else {
                    this.targetLineTo(x, y);
                    if (segLength == this.onLength) {
                        this.overflow = 0;
                        this.isLine = !this.isLine;
                    }
                    else {
                        this.overflow = this.onLength - segLength;
                        this.targetMoveTo(x, y);
                    }
                }
            }
            else {
                if (segLength > this.offLength) {
                    this.targetMoveTo(this.pen["x"] + ca * this.offLength, this.pen["y"] + sa * this.offLength);
                    this.targetLineTo(x, y);
                    this.overflow = this.onLength - (segLength - this.offLength);
                    this.isLine = true;
                }
                else {
                    this.targetMoveTo(x, y);
                    if (segLength == this.offLength) {
                        this.overflow = 0;
                        this.isLine = !this.isLine;
                    }
                    else
                        this.overflow = this.offLength - segLength;
                }
            }
        };
        /**
         * Draws a dashed curve in target using the current line style from the current drawing position to
         * (x, y) using the control point specified by (cx, cy). The current  drawing position is then set
         * to (x, y).
         * @param cx An integer that specifies the horizontal position of the control point relative to
         * the registration point of the parent movie clip.
         * @param cy An integer that specifies the vertical position of the control point relative to the
         * registration point of the parent movie clip.
         * @param x An integer that specifies the horizontal position of the next anchor point relative
         * to the registration. point of the parent movie clip.
         * @param y An integer that specifies the vertical position of the next anchor point relative to
         * the registration point of the parent movie clip.
         * @return nothing
         */
        DashedLine.prototype.curveTo = function (cx, cy, x, y) {
            var sx = this.pen["x"];
            var sy = this.pen["y"];
            var segLength = this.curveLength(sx, sy, cx, cy, x, y);
            var t = 0;
            var t2 = 0;
            var c;
            if (this.overflow) {
                if (this.overflow > segLength) {
                    if (this.isLine)
                        this.targetCurveTo(cx, cy, x, y);
                    else
                        this.targetMoveTo(x, y);
                    this.overflow -= segLength;
                    return;
                }
                t = this.overflow / segLength;
                c = this.curveSliceUpTo(sx, sy, cx, cy, x, y, t);
                if (this.isLine)
                    this.targetCurveTo(c[2], c[3], c[4], c[5]);
                else
                    this.targetMoveTo(c[4], c[5]);
                this.overflow = 0;
                this.isLine = !this.isLine;
                if (!segLength)
                    return;
            }
            var remainLength = segLength - segLength * t;
            var fullDashCount = Math.floor(remainLength / this.dashLength);
            var ont = this.onLength / segLength;
            var offt = this.offLength / segLength;
            if (fullDashCount) {
                for (var i = 0; i < fullDashCount; i++) {
                    if (this.isLine) {
                        t2 = t + ont;
                        c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                        this.targetCurveTo(c[2], c[3], c[4], c[5]);
                        t = t2;
                        t2 = t + offt;
                        c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                        this.targetMoveTo(c[4], c[5]);
                    }
                    else {
                        t2 = t + offt;
                        c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                        this.targetMoveTo(c[4], c[5]);
                        t = t2;
                        t2 = t + ont;
                        c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                        this.targetCurveTo(c[2], c[3], c[4], c[5]);
                    }
                    t = t2;
                }
            }
            remainLength = segLength - segLength * t;
            if (this.isLine) {
                if (remainLength > this.onLength) {
                    t2 = t + ont;
                    c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                    this.targetCurveTo(c[2], c[3], c[4], c[5]);
                    this.targetMoveTo(x, y);
                    this.overflow = this.offLength - (remainLength - this.onLength);
                    this.isLine = false;
                }
                else {
                    c = this.curveSliceFrom(sx, sy, cx, cy, x, y, t);
                    this.targetCurveTo(c[2], c[3], c[4], c[5]);
                    if (segLength == this.onLength) {
                        this.overflow = 0;
                        this.isLine = !this.isLine;
                    }
                    else {
                        this.overflow = this.onLength - remainLength;
                        this.targetMoveTo(x, y);
                    }
                }
            }
            else {
                if (remainLength > this.offLength) {
                    t2 = t + offt;
                    c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
                    this.targetMoveTo(c[4], c[5]);
                    c = this.curveSliceFrom(sx, sy, cx, cy, x, y, t2);
                    this.targetCurveTo(c[2], c[3], c[4], c[5]);
                    this.overflow = this.onLength - (remainLength - this.offLength);
                    this.isLine = true;
                }
                else {
                    this.targetMoveTo(x, y);
                    if (remainLength == this.offLength) {
                        this.overflow = 0;
                        this.isLine = !this.isLine;
                    }
                    else
                        this.overflow = this.offLength - remainLength;
                }
            }
        };
        DashedLine.prototype.curvedBox = function (x, y, w, h, radius) {
            var circ = 0.707107;
            var off = 0.6;
            this.moveTo(x + 0, y + radius);
            this.lineTo(x + 0, y + h - radius);
            this.curveTo(x + 0, y + (h - radius) + radius * (1 - off), x + 0 + (1 - circ) * radius, y + h - (1 - circ) * radius);
            this.curveTo(x + (0 + radius) - radius * (1 - off), y + h, x + radius, y + h);
            this.lineTo(x + w - radius, y + h);
            this.curveTo(x + (w - radius) + radius * (1 - off), y + h, x + w - (1 - circ) * radius, y + h - (1 - circ) * radius);
            this.curveTo(x + w, y + (h - radius) + radius * (1 - off), x + w, y + h - radius);
            this.lineTo(x + w, y + 0 + radius);
            this.curveTo(x + w, y + radius - radius * (1 - off), x + w - (1 - circ) * radius, y + 0 + (1 - circ) * radius);
            this.curveTo(x + (w - radius) + radius * (1 - off), y + 0, x + w - radius, y + 0);
            this.lineTo(x + radius, y + 0);
            this.curveTo(x + radius - radius * (1 - off), y + 0, x + (1 - circ) * radius, y + (1 - circ) * radius);
            this.curveTo(x + 0, y + radius - radius * (1 - off), x + 0, y + radius);
        };
        DashedLine.prototype.ellipse = function (x, y, w, h) {
            var rW = w / 2;
            var rH = h / 2;
            // Center x,y
            x += w / 2;
            y += h / 2;
            // r=circle radius, x,y=offset circle center coordinates within mcClip
            this.moveTo(x + rW, y);
            // start drawing circle CCW at positive x-axis, at distance r from center(x+r)
            // 1st anchor point...x:(x+r), y:y
            this.curveTo(rW + x, -0.4142 * rH + y, 0.7071 * rW + x, -0.7071 * rH + y);
            // control point...x:radius+x offset, y:tan(pi/8)*radius+y offset
            // 2nd anchor point...x:cos(pi/4)*radius+x offset, y:sin(pi/4)*radius+y offset
            // becomes 1st anchor point for next curveTo
            this.curveTo(0.4142 * rW + x, -rH + y, x, -rH + y);
            // control point...x:cot(3pi/8)*radius+x offset, y:-radius+ y offset
            // 2nd anchor point...x:x offset,y:-radius+y offset
            // etc...
            this.curveTo(-0.4142 * rW + x, -rH + y, -0.7071 * rW + x, -0.7071 * rH + y);
            this.curveTo(-rW + x, -0.4142 * rH + y, -rW + x, y);
            this.curveTo(-rW + x, 0.4142 * rH + y, -0.7071 * rW + x, 0.7071 * rH + y);
            this.curveTo(-0.4142 * rW + x, rH + y, x, rH + y);
            this.curveTo(0.4142 * rW + x, rH + y, 0.7071 * rW + x, 0.7071 * rH + y);
            this.curveTo(rW + x, 0.4142 * rH + y, rW + x, y);
        };
        // direct translations
        /**
         * Clears the drawing in target
         * @return nothing
         */
        DashedLine.prototype.clear = function () {
            this.target.clear();
        };
        /**
         * Sets the lineStyle for target
         * @param thickness An integer that indicates the thickness of the line in points; valid values
         * are 0 to 255. If a number is not specified, or if the parameter is undefined, a line is not
         * drawn. If a value of less than 0 is passed, Flash uses 0. The value 0 indicates hairline
         * thickness; the maximum thickness is 255. If a value greater than 255 is passed, the Flash
         * interpreter uses 255.
         * @param rgb A hex color value (for example, red is 0xFF0000, blue is 0x0000FF, and so on) of
         * the line. If a value isn?t indicated, Flash uses 0x000000 (black).
         * @param alpha An integer that indicates the alpha value of the line?s color; valid values are
         * 0?100. If a value isn?t indicated, Flash uses 100 (solid). If the value is less than 0, Flash
         * uses 0; if the value is greater than 100, Flash uses 100.
         * @return nothing
         */
        DashedLine.prototype.lineStyle = function (thickness, rgb, alpha) {
            this.target.lineStyle(thickness, rgb, alpha);
        };
        /**
         * Sets a basic fill style for target
         * @param rgb A hex color value (for example, red is 0xFF0000, blue is 0x0000FF, and so on). If
         * this value is not provided or is undefined, a fill is not created.
         * @param alpha An integer between 0?100 that specifies the alpha value of the fill. If this value
         * is not provided, 100 (solid) is used. If the value is less than 0, Flash uses 0. If the value is
         * greater than 100, Flash uses 100.
         * @return nothing
         */
        DashedLine.prototype.beginFill = function (rgb, alpha) {
            this.target.beginFill(rgb, alpha);
        };
        /**
         * Sets a gradient fill style for target
         * @param fillType Either the string "linear" or the string "radial".
         * @param colors An array of RGB hex color values to be used in the gradient (for example, red is
         * 0xFF0000, blue is 0x0000FF, and so on).
         * @param alphas An array of alpha values for the corresponding colors in the colors array; valid
         * values are 0?100. If the value is less than 0, Flash uses 0. If the value is greater than 100,
         * Flash uses 100.
         * @param ratios An array of color distribution ratios; valid values are 0?255. This value defines
         * the percentage of the width where the color is sampled at 100 percent.
         * @param matrix A transformation matrix that is an object with one of two sets of properties.
         * @return nothing
         */
        DashedLine.prototype.beginGradientFill = function (fillType, colors, alphas, ratios, matrix) {
            this.target.beginGradientFill(fillType, colors, alphas, ratios, matrix);
        };
        /**
         * Ends the fill style for target
         * @return nothing
         */
        DashedLine.prototype.endFill = function () {
            this.target.endFill();
        };
        // private methods
        DashedLine.prototype.lineLength = function (sx, sy) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!args.length) {
                return Math.sqrt(sx * sx + sy * sy);
            }
            else {
                var ex = args[0];
                var ey = args[1];
            }
            var dx = ex - sx;
            var dy = ey - sy;
            return Math.sqrt(dx * dx + dy * dy);
        };
        DashedLine.prototype.curveLength = function (sx, sy, cx, cy, ex, ey) {
            var args = [];
            for (var _i = 6; _i < arguments.length; _i++) {
                args[_i - 6] = arguments[_i];
            }
            var total = 0;
            var tx = sx;
            var ty = sy;
            var px, py, t, it, a, b, c;
            var n = args[0] != null ? args[0] : this._curveaccuracy;
            for (var i = 1; i <= n; i++) {
                t = i / n;
                it = 1 - t;
                a = it * it;
                b = 2 * t * it;
                c = t * t;
                px = a * sx + b * cx + c * ex;
                py = a * sy + b * cy + c * ey;
                total += this.lineLength(tx, ty, px, py);
                tx = px;
                ty = py;
            }
            return total;
        };
        DashedLine.prototype.curveSlice = function (sx, sy, cx, cy, ex, ey, t1, t2) {
            if (t1 == 0)
                return this.curveSliceUpTo(sx, sy, cx, cy, ex, ey, t2);
            else if (t2 == 1)
                return this.curveSliceFrom(sx, sy, cx, cy, ex, ey, t1);
            var c = this.curveSliceUpTo(sx, sy, cx, cy, ex, ey, t2);
            c.push(t1 / t2);
            return this.curveSliceFrom.apply(this, c);
        };
        DashedLine.prototype.curveSliceUpTo = function (sx, sy, cx, cy, ex, ey, t) {
            if (t === void 0) { t = 0; }
            if (t == 0)
                t = 1;
            if (t != 1) {
                var midx = cx + (ex - cx) * t;
                var midy = cy + (ey - cy) * t;
                cx = sx + (cx - sx) * t;
                cy = sy + (cy - sy) * t;
                ex = cx + (midx - cx) * t;
                ey = cy + (midy - cy) * t;
            }
            return [sx, sy, cx, cy, ex, ey];
        };
        DashedLine.prototype.curveSliceFrom = function (sx, sy, cx, cy, ex, ey, t) {
            if (t === void 0) { t = 0; }
            if (t == 0)
                t = 1;
            if (t != 1) {
                var midx = sx + (cx - sx) * t;
                var midy = sy + (cy - sy) * t;
                cx = cx + (ex - cx) * t;
                cy = cy + (ey - cy) * t;
                sx = midx + (cx - midx) * t;
                sy = midy + (cy - midy) * t;
            }
            return [sx, sy, cx, cy, ex, ey];
        };
        DashedLine.prototype.targetMoveTo = function (x, y) {
            this.pen = { x: x, y: y };
            this.target.moveTo(x, y);
        };
        DashedLine.prototype.targetLineTo = function (x, y) {
            if (x == this.pen["x"] && y == this.pen["y"])
                return;
            this.pen = { x: x, y: y };
            this.target.lineTo(x, y);
        };
        DashedLine.prototype.targetCurveTo = function (cx, cy, x, y) {
            if (cx == x && cy == y && x == this.pen["x"] && y == this.pen["y"])
                return;
            this.pen = { x: x, y: y };
            this.target.curveTo(cx, cy, x, y);
        };
        DashedLine.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.target != null) {
                this.target.clear();
                this.target = null;
            }
            this.pen = null;
        };
        return DashedLine;
    }(fairygui.GGraph));
    fairui.DashedLine = DashedLine;
    __reflect(DashedLine.prototype, "fairui.DashedLine");
})(fairui || (fairui = {}));
//# sourceMappingURL=DashedLine.js.map