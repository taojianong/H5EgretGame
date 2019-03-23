var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        var MathUnit = (function () {
            function MathUnit() {
            }
            MathUnit.smoothstep = function (min, max, value) {
                if (value < min) {
                    return 0;
                }
                if (value > max) {
                    return 1;
                }
                var t = (value - min) / (max - min);
                return -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2);
            };
            MathUnit.getPointDirInLine = function (px, py, p1x, p1y, p2x, p2y) {
                var tmpx = (p1x - p2x) / (p1y - p2y) * (py - p2y) + p2x;
                if (tmpx > px)
                    return -1;
                else if (tmpx == px) {
                    return 0;
                }
                return 1;
            };
            MathUnit.getPointDirInLine_v2 = function (x, y, x1, y1, x2, y2) {
                var tmp = (y1 - y2) * x + (x2 - x1) * y + (x1 * y2) - (x2 * y1);
                if (tmp > 0) {
                    return -1;
                }
                else if (tmp == 0) {
                    return 0;
                }
                return 1;
            };
            MathUnit.getPointDirInLine_v3 = function (x, y, x1, y1, x2, y2) {
                var tmp = (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
                if (tmp > 0) {
                    return -1;
                }
                else if (tmp == 0) {
                    return 0;
                }
                return 1;
            };
            MathUnit.prototype.cosa_leng = function (A, B, a) {
                return Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(a));
            };
            MathUnit.rectInsetRound = function (rect, cx, cy, range) {
                //cx = cx);
                //cy = cy);
                //range = range);
                return false;
            };
            MathUnit.distance4_3D = function (x1, y1, x2, y2) {
                var dy = 4 * (y1 - y2) / 3;
                return Math.sqrt((x1 - x2) * (x1 - x2) + (dy) * (dy));
            };
            MathUnit.distance3_2D = function (x1, y1, x2, y2) {
                var dy = 3 * (y1 - y2) / 2;
                return Math.sqrt((x1 - x2) * (x1 - x2) + (dy) * (dy));
            };
            MathUnit.distance25D = function (x1, y1, x2, y2) {
                return Math.sqrt((x1 - x2) * (x1 - x2) + 4 * (y1 - y2) * (y1 - y2));
            };
            MathUnit.randRange = function (min, max) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomNum;
            };
            MathUnit.degreesToRadin = function (degrees) {
                return degrees * Math.PI / 180;
            };
            MathUnit.radinToDegrees = function (radian) {
                return radian * 180 / Math.PI;
            };
            MathUnit.getDistributionPointOnPoint = function (px, py, tx, ty, degrees, num, dis) {
                if (num === void 0) { num = 3; }
                if (dis === void 0) { dis = -1; }
                var list = new Array();
                var totalAngel = degrees * (num - 1);
                var halfAngel = totalAngel * 0.5;
                var crtDeg = MathUnit.radinToDegrees(MathUnit.atan2Angle(tx, ty, px, py));
                if (crtDeg < 0)
                    crtDeg += 360;
                var sDeg = crtDeg - halfAngel;
                var distance = (dis == -1 ? MathUnit.distancePoint2Point(px, py, tx, ty) : dis);
                var angel = MathUnit.degreesToRadin(degrees);
                var startAngel = MathUnit.degreesToRadin(sDeg);
                if (startAngel < 0)
                    startAngel += Math.PI * 2;
                for (var i = 0; i < num; i++) {
                    var deg = startAngel + i * angel;
                    var p = new egret.Point();
                    p.x = Math.cos(deg) * distance + px;
                    p.y = Math.sin(deg) * distance + py;
                    list.push(p);
                }
                return list;
            };
            MathUnit.distanceMinPoint = function (px, py, px2, py2) {
                // px = px);
                // py = py);
                // px2 = px2);
                // py2 = py2);
                var decx = Math.abs(px - px2);
                var decy = Math.abs(py - py2);
                return decx > decy ? decx : decy;
            };
            MathUnit.distancePoint2Point = function (px, py, px2, py2) {
                // px = px);
                // py = py);
                // px2 = px2);
                // py2 = py2);
                var distance = Math.sqrt(Math.pow(px - px2, 2) + Math.pow(py - py2, 2));
                return distance;
            };
            MathUnit.selectMonsterInSectorFromVector = function (p1, p, target, angle, dis) {
                //dis = dis);
                var ang = MathUnit.get_angle(p1, target, p);
                var d = egret.Point.distance(new egret.Point(target.x, target.y), new egret.Point(p.x, p.y));
                if (ang <= angle / 2 && d <= dis)
                    return true;
                return false;
            };
            MathUnit.get_angle = function (p1, p2, p) {
                var angle = 0;
                var MMM_PI = 3.1415926;
                var va = p1.subtract(p);
                var vb = p2.subtract(p);
                var productValue = va.x * vb.x + va.y * vb.y;
                var va_val = Math.sqrt(va.x * va.x + va.y * va.y);
                var vb_val = Math.sqrt(vb.x * vb.x + vb.y * vb.y);
                var cosValue = productValue / (va_val * vb_val);
                if (cosValue < -1 && cosValue > -2) {
                    cosValue = -1;
                }
                else if (cosValue > 1 && cosValue < 2) {
                    cosValue = 1;
                }
                angle = Math.acos(cosValue) * 180 / MMM_PI;
                return angle;
            };
            MathUnit.getPointInSector = function (px, py, sx, sy, ex, ey, centerX, centerY) {
                // px = px);
                // py = py);
                // sx = sx);
                // sy = sy);
                // ex = ex);
                // ey = ey);
                // centerX = centerX);
                // centerY = centerY);
                var ret = false;
                var distance = MathUnit.distancePoint2Point(px, py, centerX, centerY);
                var dis2 = MathUnit.distancePoint2Point(centerX, centerY, sx, sy);
                if (distance > dis2) {
                    return false;
                }
                var sAngel = MathUnit.atan2Angle(sx, sy, centerX, centerY);
                var eAngel = MathUnit.atan2Angle(ex, ey, centerX, centerY);
                var bool = false;
                if (sAngel < 0) {
                    sAngel += Math.PI * 2;
                    eAngel += Math.PI * 2;
                    bool = true;
                }
                if (eAngel < 0) {
                    eAngel += Math.PI * 2;
                }
                var angel = MathUnit.atan2Angle(px, py, centerX, centerY);
                if (bool || angel < 0)
                    angel += Math.PI * 2;
                if (angel >= sAngel && angel <= eAngel) {
                    ret = true;
                }
                return ret;
            };
            MathUnit.atan2Angle = function (targetX, targetY, startX, startY, dir) {
                if (dir === void 0) { dir = 0; }
                var decy = targetY - startY;
                var decx = targetX - startX;
                var angle = 0;
                if (decy == 0 && decx == 0) {
                    angle = Math.PI * (dir / 4 - 0.5);
                }
                else {
                    angle = Math.atan2(decy, decx);
                }
                return angle;
            };
            MathUnit.toPoint = function (display, mat, cx, cy, $angle) {
                var mat1 = new egret.Matrix();
                mat1.translate(cx, cy);
                mat1.rotate($angle);
                mat1.concat(mat);
                mat1.translate(cx * -1, cy * -1);
                display.matrix = mat1;
            };
            return MathUnit;
        }());
        utils.MathUnit = MathUnit;
        __reflect(MathUnit.prototype, "com.utils.MathUnit");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=MathUnit.js.map